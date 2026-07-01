import { register } from '../utils/authService.js';
import { renderNavbar } from '../components/navbar.js';

export function renderRegister(container) {

  container.innerHTML = `
    <div>
      ${renderNavbar()}

      <form id="registerForm">

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
        >

        <input
          type="email"
          name="email"
          placeholder="Correo"
          required
        >

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        >

        <button type="submit">
          Registrar
        </button>

      </form>
    </div>
  `;

  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    try {

      await register({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      });

      alert('Usuario registrado');

      location.hash = '#login';

    } catch (error) {

      alert(error.message);

    }

  });
}