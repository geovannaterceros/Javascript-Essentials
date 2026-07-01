import { renderHome } from './pages/home.js'
import { renderBooks } from './pages/books.js'
import { renderLogin } from './pages/login.js'

export function router(route) {
  const app = document.getElementById('app')
  const hash = route.slice(1) || 'home'

  const routes = {
    home: renderHome,
    books: renderBooks,
    login: renderLogin
  }

  const handler = routes[hash] || renderHome
  handler(app)
}
