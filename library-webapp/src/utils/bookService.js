import booksData from '../data/books.json' assert { type: 'json' }

const STORAGE_KEY = 'library_books'

// Inicializar con datos por defecto si no hay nada en localStorage
function initBooks() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
  }
}

// Obtener todos los libros
export function getBooks() {
  initBooks()
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

// Crear un nuevo libro
export function createBook(book) {
  const books = getBooks()
  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    ...book
  }
  books.push(newBook)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  return newBook
}

// Obtener un libro por ID
export function getBookById(id) {
  const books = getBooks()
  return books.find(book => book.id === id)
}

// Actualizar un libro
export function updateBook(id, updates) {
  const books = getBooks()
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books[index] = { ...books[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    return books[index]
  }
  return null
}

// Eliminar un libro
export function deleteBook(id) {
  const books = getBooks()
  const filtered = books.filter(book => book.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

// Resetear a datos originales
export function resetBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
}
