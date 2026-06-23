import {renderNavbar} from '../components/navbar.js'
import { login } from '../utils/authService.js'

export function renderLogin(container) {

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      ${renderNavbar()}
        <div class="max-w-md mx-auto px-4 py-16">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h2>
                <form id="loginForm" class="space-y-6">
                    <div>
                        <label for="email" class="block text-gray-700">Correo Electrónico</label>
                        <input type="email" id="email" name="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700">Contraseña</label>
                        <input type="password" id="password" name="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    </div>
  `


const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const email = formData.get('email');
  const password = formData.get('password');

  try {

    const data = await login(
      email,
      password
    );

    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    location.hash = '#books';

  } catch (error) {

    alert(error.message);

  }

})
}