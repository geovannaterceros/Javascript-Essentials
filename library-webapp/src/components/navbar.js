export function renderNavbar() {
  return `
    <nav class="bg-blue-900 shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold">📚 Library WebApp</h1>
        <div class="space-x-4">
          <a href="#home" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Inicio</a>
          <a href="#books" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Libros</a>
          <a href="#about" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Acerca de</a>
          <a href="#login" class="text-white hover:bg-blue-700 px-3 py-2 rounded transition">Login</a>
        </div>
      </div>
    </nav>
  `
}
