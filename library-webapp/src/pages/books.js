import { renderNavbar } from '../components/navbar.js'
import { getBooks, createBook, deleteBook } from '../utils/bookService.js'

export function renderBooks(container) {
  const books = getBooks()

  const booksHTML = books.map(book => `
    <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-2">${book.title}</h3>
      <p class="text-gray-600 mb-2">Autor: ${book.author}</p>
      <p class="text-gray-600 mb-2">Año: ${book.year}</p>
      <div class="flex items-center mb-4">
        <span class="text-yellow-500 mr-2">⭐</span>
        <span class="text-gray-700 font-semibold">${book.rating}/5</span>
      </div>
      <div class="flex gap-2">
        <button data-edit="${book.id}" class="btn-edit flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition">Editar</button>
        <button data-delete="${book.id}" class="btn-delete flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition">Eliminar</button>
      </div>
    </div>
  `).join('')

  container.innerHTML = `
    <div class="min-h-screen bg-gray-100">
      ${renderNavbar()}

      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="mb-8">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Nuestro Catálogo</h2>
          <button id="btn-add-book" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
            ➕ Agregar Libro
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${booksHTML}
        </div>
      </div>

      <!-- Modal Formulario -->
      <div id="modal-form" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Agregar Nuevo Libro</h3>
          
          <form id="form-add-book" class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Título</label>
              <input type="text" name="title" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ej: Don Quijote">
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Autor</label>
              <input type="text" name="author" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ej: Miguel de Cervantes">
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Año</label>
              <input type="number" name="year" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ej: 1605">
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Calificación (0-5)</label>
              <input type="number" name="rating" min="0" max="5" step="0.1" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ej: 4.5">
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
                Guardar
              </button>
              <button type="button" id="btn-cancel" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `

  // Event listeners
  const modal = document.getElementById('modal-form')
  const btnAddBook = document.getElementById('btn-add-book')
  const btnCancel = document.getElementById('btn-cancel')
  const formAddBook = document.getElementById('form-add-book')

  // Abrir modal
  btnAddBook.addEventListener('click', () => {
    modal.classList.remove('hidden')
  })

  // Cerrar modal
  btnCancel.addEventListener('click', () => {
    modal.classList.add('hidden')
    formAddBook.reset()
  })

  // Cerrar modal al hacer clic fuera del formulario
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden')
      formAddBook.reset()
    }
  })

  // Enviar formulario
  formAddBook.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(formAddBook)
    const newBook = {
      title: formData.get('title').trim(),
      author: formData.get('author').trim(),
      year: parseInt(formData.get('year')),
      rating: parseFloat(formData.get('rating'))
    }

    createBook(newBook)
    modal.classList.add('hidden')
    formAddBook.reset()
    renderBooks(container)
  })

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = parseInt(e.target.dataset.delete)
      if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        deleteBook(bookId)
        renderBooks(container)
      }
    })
  })

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = parseInt(e.target.dataset.edit)
      const book = books.find(b => b.id === bookId)
      const newTitle = prompt('Nuevo título:', book.title)
      if (newTitle) {
        alert('Funcionalidad de edición se integrará con el backend Node.js')
      }
    })
  })
}
