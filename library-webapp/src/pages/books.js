import { renderNavbar , setupNavbar } from '../components/navbar.js'
import { createBook, deleteBook, getBooks, updateBook } from '../utils/bookService.js'

let editingBookId = null
export async function renderBooks(container, searchTerm = '') {
    const books = await getBooks(searchTerm);
    const totalBooks = (await getBooks()).length;


  const booksHTML = books.map(book => `
<div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4">
  <h3 class="text-lg font-bold text-gray-800 mb-2">${book.title}</h3>
  <p class="text-gray-600 mb-1">Autor: ${book.author}</p>
  <p class="text-gray-600 mb-1">Categoría: ${book.category}</p>
  <p class="text-gray-600 mb-1">Idioma: ${book.lenguage}</p>
  <p class="text-gray-600 mb-1">Año: ${book.year}</p>
  <p class="text-gray-600 mb-1">Edición: ${book.edition}</p>
  <p class="text-gray-600 mb-3">${book.description}</p>
  <div class="font-bold text-green-600 mb-4">${book.currency} ${book.price}</div>
  <div class="flex gap-2">
    <button
      data-edit="${book.id}"
      class="btn-edit flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition">
      Editar
    </button>

    <button
      data-delete="${book.id}"
      class="btn-delete flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition">
      Eliminar
    </button>
  </div>
</div>
`).join('')

  const emptyStateHTML = `
    <div class="col-span-full bg-white border border-gray-200 rounded-lg p-8 text-center">
      <h3 class="text-xl font-bold text-gray-800 mb-2">No se encontraron libros</h3>
      <p class="text-gray-600">Prueba buscando por titulo, autor o ano.</p>
    </div>
  `

  container.innerHTML = `
    <div class="min-h-screen bg-gray-100">
      ${renderNavbar()}

      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="mb-8">
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 class="text-4xl font-bold text-gray-800 mb-2">Nuestro Catalogo</h2>
              <p class="text-gray-600">${books.length} de ${totalBooks} libros visibles</p>
            </div>

            <button id="btn-add-book" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
              Agregar Libro
            </button>
          </div>

          <div class="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              id="book-search"
              type="search"
              value="${escapeHtml(searchTerm)}"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Buscar por titulo, autor o ano"
              autocomplete="off"
            >
            <button id="btn-clear-search" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded transition">
              Limpiar
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${books.length ? booksHTML : emptyStateHTML}
        </div>
      </div>

      <div id="modal-form" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h3 id="modal-title" class="text-2xl font-bold text-gray-800 mb-6"> Agregar Nuevo Libro </h3>
<form id="form-add-book" class="space-y-4">

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Título
    </label>
    <input
      type="text"
      name="title"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: Clean Code">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Descripción
    </label>
    <textarea
      name="description"
      required
      rows="3"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Descripción del libro"></textarea>
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Autor
    </label>
    <input
      type="text"
      name="author"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: Robert C. Martin">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Categoría
    </label>
    <input
      type="text"
      name="category"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: Software Development">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Idioma
    </label>
    <input
      type="text"
      name="lenguage"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: English">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Año
    </label>
    <input
      type="number"
      name="year"
      required
      min="1000"
      max="2100"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: 2008">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Edición
    </label>
    <input
      type="text"
      name="edition"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: 1st Edition">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Precio
    </label>
    <input
      type="number"
      name="price"
      required
      min="0"
      step="0.01"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Ej: 29.99">
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2">
      Moneda
    </label>
    <select
      name="currency"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">

      <option value="">Seleccione</option>
      <option value="USD">USD</option>
      <option value="BOB">BOB</option>
      <option value="EUR">EUR</option>
    </select>
  </div>

  <div class="flex gap-4 pt-4">
    <button
      type="submit"
      class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
      Guardar
    </button>

    <button
      type="button"
      id="btn-cancel"
      class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition">
      Cancelar
    </button>
  </div>

</form>
        </div>
      </div>
    </div>
  `
  setupNavbar()

  const modal = document.getElementById('modal-form')
  const btnAddBook = document.getElementById('btn-add-book')
  const btnCancel = document.getElementById('btn-cancel')
  const formAddBook = document.getElementById('form-add-book')
  const searchInput = document.getElementById('book-search')
  const btnClearSearch = document.getElementById('btn-clear-search')
  const modalTitle = document.getElementById('modal-title')

  
 
  searchInput.focus()
  searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length)

  searchInput.addEventListener('input', (e) => {
    renderBooks(container, e.target.value)
  })

  btnClearSearch.addEventListener('click', () => {
    renderBooks(container)
  })

  btnAddBook.addEventListener('click', () => {
    modal.classList.remove('hidden')
  })

  btnCancel.addEventListener('click', () => {
    modal.classList.add('hidden')
    formAddBook.reset()
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden')
      formAddBook.reset()
    }
  })

  formAddBook.addEventListener('submit', async(e) => {
    e.preventDefault()

    const formData = new FormData(formAddBook)

    const newBook = {
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      author: formData.get('author').trim(),
      category: formData.get('category').trim(),
      lenguage: formData.get('lenguage').trim(),
      year: parseInt(formData.get('year')),
      edition: formData.get('edition').trim(),
      price: parseFloat(formData.get('price')),
      currency: formData.get('currency')
    } 
    
    let result;

    if (editingBookId) {

       result = await updateBook(
        editingBookId,
        newBook
      )
        modalTitle.textContent = 'Editar Libro'
    }
    else{
      result = await createBook(newBook)
      modalTitle.textContent = 'Agregar Nuevo Libro'
    }
      
    editingBookId = null;
    modal.classList.add('hidden')
    formAddBook.reset()

     if (!result.success) return;


    await renderBooks(container, searchInput.value)
  })

 document.querySelectorAll('.btn-edit').forEach(btn => {
  btn.addEventListener('click', (e) => {

    const bookId = parseInt(e.target.dataset.edit)

    const book = books.find(
      b => b.id === bookId
    )

    editingBookId = bookId

    formAddBook.title.value = book.title
    formAddBook.description.value = book.description
    formAddBook.author.value = book.author
    formAddBook.category.value = book.category
    formAddBook.lenguage.value = book.lenguage
    formAddBook.year.value = book.year
    formAddBook.edition.value = book.edition
    formAddBook.price.value = book.price
    formAddBook.currency.value = book.currency

    modal.classList.remove('hidden')
  })
})

  document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const bookId = parseInt(e.target.dataset.delete);

    if (confirm('¿Estas seguro de que deseas eliminar este libro?')) {
      const result = await deleteBook(bookId);

      // si no fue exitoso, no recargues libros
      if (!result.success) return;

      await renderBooks(container, searchInput.value);
    }
  });
});
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
