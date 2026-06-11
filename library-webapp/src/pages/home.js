import { renderNavbar } from '../components/navbar.js'

export function renderHome(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      ${renderNavbar()}

      <div class="max-w-6xl mx-auto px-4 py-16">
        <div class="text-center text-white">
          <h2 class="text-5xl font-bold mb-4">Bienvenido a Library WebApp</h2>
          <p class="text-xl mb-8 opacity-90">Tu biblioteca digital de libros y referencias</p>
          <a href="#books" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition inline-block">
            Explorar Libros
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-4xl mb-4">📖</div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">Amplio Catálogo</h3>
            <p class="text-gray-600">Miles de libros disponibles en diferentes categorías</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">Búsqueda Avanzada</h3>
            <p class="text-gray-600">Encuentra exactamente lo que buscas con filtros inteligentes</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">Calificaciones</h3>
            <p class="text-gray-600">Descubre los libros mejor valorados por la comunidad</p>
          </div>
        </div>
      </div>
    </div>
  `
}
