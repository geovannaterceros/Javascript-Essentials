import { test, expect, beforeEach } from 'vitest'
import { renderForm } from '../src/views/form.js'

beforeEach(() => {
  document.body.innerHTML = `
    <div id="app"></div>
  `
})

test('Muestra error si el input está vacío', () => {
  const app = document.getElementById('app')
  renderForm(app)

  const form = document.getElementById('myForm')
  const error = document.getElementById('error')

  form.dispatchEvent(new Event('submit'))

  expect(error.textContent).toBe('Nombre requerido')
})

test('Envia el formulario correctamente', () => {
  const app = document.getElementById('app')
  renderForm(app)

  const input = document.getElementById('name')
  const form = document.getElementById('myForm')

  input.value = 'Juan'

  form.dispatchEvent(new Event('submit'))

  const result = document.querySelector('h2')

  expect(result.textContent).toContain('Juan')
})
