import booksData from '../data/books.json' assert { type: 'json' }
import { getToken } from './authService.js';

export async function getBooks(search = '') {

  const token = getToken();

  try {

    const response = await fetch(
      `http://localhost:3000/books?search=${encodeURIComponent(search)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (handleUnauthorized(response)) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.error(error);

    alert('No fue posible conectarse con el servidor.');

    return [];
  }
}

export async function createBook(book) {

  const token = getToken();

  const response = await fetch(
    'http://localhost:3000/books',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(book)
    }
  );

  if (handleUnauthorized(response)) {
      return;
  }
  
  if(!response.ok) {
    return { success: false };
  }

  const data = await response.json(); 

  return {
    success: true,
    data
  }
}

// Obtener un libro por ID

export async function updateBook(id, updates) {

  const token = getToken();

  const response = await fetch(
    `http://localhost:3000/books/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    }
  );

  if (handleUnauthorized(response)) {
      return;
  }

  if(!response){
     return { success: false };
  }
  const data = await response.json();

  return {
    success: true,
    data
  };
}

export function getBookById(id) {
  const books = getBooks()
  return books.find(book => book.id === id)
}

export async function deleteBook(id) {

  const token = getToken();

  const response = await fetch(
    `http://localhost:3000/books/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  if (handleUnauthorized(response)) {
    return { success: false, unauthorized: true };
  }

  if (!response.ok) {
    return { success: false };
  }

  return { success: true };
}
function handleUnauthorized(response) {

  if (response.status === 401 || response.status === 403) {

    alert('Su sesión ha expirado. Debe iniciar sesión.');  
    location.hash = '#login';

    return true;
  }

  return false;
}