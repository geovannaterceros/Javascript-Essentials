import { renderNavbar } from '../components/navbar.js'

export function renderAbout(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gray-100">
      ${renderNavbar()}

      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Acerca de Library WebApp</h2>
          
          <div class="space-y-6 text-gray-700">
            <p class="text-lg">
              Library WebApp es una plataforma moderna desarrollada con Vite y Tailwind CSS 
              para explorar y gestionar una colección digital de libros.
            </p>
            
            <div>
              <h3 class="text-2xl font-bold text-blue-600 mb-3">Características</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <span class="text-green-500 mr-3">✓</span>
                  Catálogo de libros con calificaciones
                </li>
                <li class="flex items-center">
                  <span class="text-green-500 mr-3">✓</span>
                  Navegación SPA sin recargas de página
                </li>
                <li class="flex items-center">
                  <span class="text-green-500 mr-3">✓</span>
                  Interfaz responsiva y moderna
                </li>
                <li class="flex items-center">
                  <span class="text-green-500 mr-3">✓</span>
                  Tecnologías modernas (Vite, Tailwind CSS)
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-bold text-blue-600 mb-3">Tecnologías Utilizadas</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded">
                  <p class="font-semibold text-blue-600">Frontend</p>
                  <p class="text-sm">Vanilla JavaScript, HTML5</p>
                </div>
                <div class="bg-green-50 p-4 rounded">
                  <p class="font-semibold text-green-600">Styling</p>
                  <p class="text-sm">Tailwind CSS</p>
                </div>
                <div class="bg-purple-50 p-4 rounded">
                  <p class="font-semibold text-purple-600">Build</p>
                  <p class="text-sm">Vite</p>
                </div>
                <div class="bg-orange-50 p-4 rounded">
                  <p class="font-semibold text-orange-600">Testing</p>
                  <p class="text-sm">Vitest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
