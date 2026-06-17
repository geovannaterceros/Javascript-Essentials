import { after, before, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import app, { resetBooks } from '../src/index.js';

describe('library-api', () => {
  let server;
  let baseUrl;
  let token;

  before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once('listening', resolve));

    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  beforeEach(() => {
    resetBooks();
    token = null;
  });

  async function login() {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@library.com',
        password: 'admin123',
      }),
    });
    const body = await response.json();

    token = body.token;
    return body;
  }

  async function authHeaders() {
    if (!token) {
      await login();
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  it('GET / returns the health message', async () => {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      message: 'API Express funcionando correctamente',
    });
  });

  it('POST /auth/login returns a token', async () => {
    const body = await login();

    assert.equal(typeof body.token, 'string');
    assert.deepEqual(body.user, {
      id: 1,
      email: 'admin@library.com',
    });
  });

  it('POST /auth/login rejects invalid credentials', async () => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@library.com',
        password: 'wrong',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 401);
    assert.deepEqual(body, { error: 'Invalid credentials' });
  });

  it('GET /books requires a token', async () => {
    const response = await fetch(`${baseUrl}/books`);
    const body = await response.json();

    assert.equal(response.status, 401);
    assert.deepEqual(body, { error: 'Unauthorized' });
  });

  it('GET /books returns all books', async () => {
    const response = await fetch(`${baseUrl}/books`, {
      headers: await authHeaders(),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.length, 2);
    assert.deepEqual(body[0], {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: 2008,
    });
  });

  it('GET /books/:id returns one book', async () => {
    const response = await fetch(`${baseUrl}/books/2`, {
      headers: await authHeaders(),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      id: 2,
      title: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      year: 2018,
    });
  });

  it('GET /books/:id returns 404 when the book does not exist', async () => {
    const response = await fetch(`${baseUrl}/books/999`, {
      headers: await authHeaders(),
    });
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.deepEqual(body, { error: 'Book not found' });
  });

  it('POST /books creates a book', async () => {
    const response = await fetch(`${baseUrl}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeaders()),
      },
      body: JSON.stringify({
        title: 'The Pragmatic Programmer',
        author: 'David Thomas and Andrew Hunt',
        year: 1999,
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(body, {
      id: 3,
      title: 'The Pragmatic Programmer',
      author: 'David Thomas and Andrew Hunt',
      year: 1999,
    });
  });

  it('POST /books validates required fields', async () => {
    const response = await fetch(`${baseUrl}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeaders()),
      },
      body: JSON.stringify({ title: 'Missing data' }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(body, {
      error: 'Title, author and year are required',
    });
  });

  it('POST /books validates year type', async () => {
    const response = await fetch(`${baseUrl}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeaders()),
      },
      body: JSON.stringify({
        title: 'Bad Year',
        author: 'Unknown',
        year: '2020',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(body, {
      error: 'Year must be a number',
    });
  });

  it('PUT /books/:id updates a book', async () => {
    const response = await fetch(`${baseUrl}/books/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeaders()),
      },
      body: JSON.stringify({
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        year: 2017,
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      id: 1,
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      year: 2017,
    });
  });

  it('DELETE /books/:id deletes a book', async () => {
    const deleteResponse = await fetch(`${baseUrl}/books/1`, {
      method: 'DELETE',
      headers: await authHeaders(),
    });
    const getResponse = await fetch(`${baseUrl}/books/1`, {
      headers: await authHeaders(),
    });
    const body = await getResponse.json();

    assert.equal(deleteResponse.status, 204);
    assert.equal(getResponse.status, 404);
    assert.deepEqual(body, { error: 'Book not found' });
  });
});
