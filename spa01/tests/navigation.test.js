
import { test, expect, beforeEach } from 'vitest'
import { navigate } from '../src/router.js'

beforeEach(() => {
  document.body.innerHTML = `
    <div id="app"></div>
  `
})

test('navega a home', () => {
  navigate('home')

  const title = document.querySelector('h1')

  expect(title.textContent).toBe('Home')
})

test('navega a form', () => {
  navigate('form')

  const input = document.getElementById('name')

  expect(input).not.toBeNull()
})

/*test('navega a under construction', () => {
  navigate('news')

  const message = document.querySelector('h2')

  expect(message.textContent).match(/Under/);
})*/
