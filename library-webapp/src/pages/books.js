export function renderBooks(container) {
  const books = [
    { id: 1, title: 'Don Quijote', author: 'Miguel de Cervantes', year: 1605, rating: 4.5 },
    { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', year: 1967, rating: 4.8 },
    { id: 3, title: 'El Quijote', author: 'Miguel de Cervantes', year: 1605, rating: 4.6 },
    { id: 4, title: '1984', author: 'George Orwell', year: 1949, rating: 4.4 }
  ]

  const booksHTML = books.map(book => `
    <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-2">${book.title}</h3>
      <p class="text-gray-600 mb-2">Autor: ${book.author}</p>
      <p class="text-gray-600 mb-2">Año: ${book.year}</p>
      <div class="flex items-center">
        <span class="text-yellow-500 mr-2">⭐</span>
        <span class="text-gray-700 font-semibold">${book.rating}/5</span>
      </div>
    </div>
  `).join('')

  container.innerHTML = `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-blue-900 shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-white text-2xl font-bold">📚 Library WebApp</h1>
          <div class="space-x-4">
            <a href="#home" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Inicio</a>
            <a href="#books" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Libros</a>
            <a href="#about" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Acerca de</a>
          </div>
        </div>
      </nav>

      <div class="max-w-6xl mx-auto px-4 py-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-8">Nuestro Catálogo</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${booksHTML}
        </div>
      </div>
    </div>
  `
}
