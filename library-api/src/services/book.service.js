import initialBooks from '../books.json' with { type: 'json' };

let books = structuredClone(initialBooks);
let nextBookId = books.length + 1;

export function resetBooks() {
  books = structuredClone(initialBooks);
  nextBookId = books.length + 1;
}

export async function getAllBooks() {
  return books;
}

export async function getBookById(id) {
  return books.find((book) => book.id === Number(id));
}

export async function createBook(data) {
  const book = {
    id: nextBookId,
    ...data,
  };

  nextBookId += 1;
  books.push(book);

  return book;
}

export async function updateBook(id, data) {
  const book = await getBookById(id);

  if (!book) {
    return null;
  }

  book.title = data.title;
  book.author = data.author;
  book.year = data.year;

  return book;
}

export async function deleteBook(id) {
  const bookIndex = books.findIndex((book) => book.id === Number(id));

  if (bookIndex === -1) {
    return null;
  }

  const [deletedBook] = books.splice(bookIndex, 1);
  return deletedBook;
}
