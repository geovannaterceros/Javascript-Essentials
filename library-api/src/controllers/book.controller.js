import * as bookService from '../services/book.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getBooks = asyncHandler(async (req, res) => {
  const books = await bookService.getAllBooks();
  res.json(books);
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

export const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
});

export const updateBook = asyncHandler(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await bookService.deleteBook(req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(204).send();
});
