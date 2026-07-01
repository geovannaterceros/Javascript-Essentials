import { renderNavbar } from "../components/navbar.js";
import { login, register } from "../utils/authService.js";

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
                    <p class="text-center text-gray-600 mt-4">
                      ¿No tienes cuenta?
                    <button id="btn-register" type="button" class="text-blue-600 hover:text-blue-800 font-semibold ml-1">
                      Regístrate aquí
                    </button>
                    </p>
                </form>
                <div id="register-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h3 class="text-2xl font-bold mb-6">  Registrar Usuario</h3>  
                  <form id="registerForm" class="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      required
                      class="w-full border rounded-lg p-2">

                    <input
                      type="email"
                      name="email"
                      placeholder="Correo"
                      required
                      class="w-full border rounded-lg p-2">

                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      required
                      class="w-full border rounded-lg p-2">

                    <input
                      type="number"
                      name="age"
                      placeholder="Edad"
                      required
                      class="w-full border rounded-lg p-2">

                    <input
                      type="text"
                      name="address"
                      placeholder="Dirección"
                      required
                      class="w-full border rounded-lg p-2">

                    <input
                      type="text"
                      name="phone"
                      placeholder="Teléfono"
                      required
                      class="w-full border rounded-lg p-2">

                    <div class="flex gap-4">

                      <button
                        type="submit"
                        class="flex-1 bg-green-600 text-white py-2 rounded">
                        Registrar
                      </button>

                      <button
                        id="btn-close-register"
                        type="button"
                        class="flex-1 bg-gray-500 text-white py-2 rounded">
                        Cancelar
                      </button>

                    </div>

                  </form>

                </div>

              </div>
            </div>
        </div>
    </div>
  `;

  const form = document.getElementById("loginForm");

  const registerModal = document.getElementById("register-modal");

  const btnRegister = document.getElementById("btn-register");

  const btnCloseRegister = document.getElementById("btn-close-register");

  btnRegister.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
  });

  btnCloseRegister.addEventListener("click", () => {
    registerModal.classList.add("hidden");
  });

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);

    try {
      await register({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        age: Number(formData.get("age")),
        address: formData.get("address"),
        phone: formData.get("phone"),
      });

      alert("Usuario registrado correctamente");

      registerModal.classList.add("hidden");

      registerForm.reset();
    } catch (error) {
      alert(error.message);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      location.hash = "#books";
    } catch (error) {
      alert(error.message);
    }
  });
}
