export function renderForm(container) {
  container.innerHTML = `
    <form id="myForm">
      <input id="name" />
      <button type="submit">Enviar</button>
      <p id="error"></p>
    </form>
  `

  const form = document.getElementById('myForm')
  const input = document.getElementById('name')
  const error = document.getElementById('error')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!input.value) {
      error.textContent = 'Nombre requerido'
      return
    }

    error.textContent = ''
    container.innerHTML = `<h2>Enviado: ${input.value}</h2>`
  })
}
