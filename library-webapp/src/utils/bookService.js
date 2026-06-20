import booksData from '../data/books.json' assert { type: 'json' }

const STORAGE_KEY = 'library_books'

// Inicializar con datos por defecto si no hay nada en localStorage
function initBooks() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
  }
}

export async function getBooks() {
  const response = await fetch('http://localhost:3000/books')
  if (!response.ok) {
    throw new Error('Error fetching books')
  }
 // console.log(response.json());
  return response.json();
}

// Buscar libros por titulo, autor o ano
export function searchBooks(term) {
  const query = term.trim().toLowerCase()
  const books = getBooks()

  if (!query) {
    return books
  }

  return books.filter(book => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      String(book.year).includes(query)
    )
  })
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
