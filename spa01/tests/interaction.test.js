import { test, expect, beforeEach } from 'vitest'
import { navigate } from '../src/router.js'

beforeEach(() => {
  document.body.innerHTML = `
    <button id="homeBtn"></button>
    <button id="formBtn"></button>
    <div id="app"></div>
  `
})

test('click cambia de vista', () => {
  document.getElementById('formBtn')
    .addEventListener('click', () => navigate('form'))

  document.getElementById('formBtn').click()

  expect(document.getElementById('name')).not.toBeNull()
})
