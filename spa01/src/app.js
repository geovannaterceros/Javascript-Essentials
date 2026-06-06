import { navigate } from './router.js'

document.getElementById('homeBtn')
  .addEventListener('click', () => navigate('home'))

document.getElementById('formBtn')
  .addEventListener('click', () => navigate('form'))

  document.getElementById('newsBtn')
  .addEventListener('click', () => navigate('news'))

  document.getElementById('profileBtn')
  .addEventListener('click', () => navigate('profile'))

// inicial
navigate('home')
