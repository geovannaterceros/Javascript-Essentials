import initialBooks from '../books.json' with { type: 'json' };

let books = structuredClone(initialBooks);
let nextBookId = books.length + 1;

export function resetBooks() {
  books = structuredClone(initialBooks);
  nextBookId = books.length + 1;
}

export async function getAllBooks(search = '') {

  if (!search) {
    return books;
  }

  const searchLower = search.toLowerCase();

  return books.filter(book => {

   // console.log(book);

    console.log({
      title: book.title,
      author: book.author,
      category: book.category,
      lenguage: book.lenguage,
      edition: book.edition,
      description: book.description
    });

    return (
      (book.title ?? '').toLowerCase().includes(searchLower) ||
      (book.author ?? '').toLowerCase().includes(searchLower) ||
      (book.category ?? '').toLowerCase().includes(searchLower) ||
      (book.lenguage ?? '').toLowerCase().includes(searchLower) ||
      (book.edition ?? '').toLowerCase().includes(searchLower) ||
      (book.description ?? '').toLowerCase().includes(searchLower) ||
      String(book.year ?? '').includes(searchLower)
    );
  });

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

  Object.assign(book, data);

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
