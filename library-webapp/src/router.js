import { renderHome } from './pages/home.js'
import { renderBooks } from './pages/books.js'
import { renderAbout } from './pages/about.js'

export function router(route) {
  const app = document.getElementById('app')
  const hash = route.slice(1) || 'home'

  const routes = {
    home: renderHome,
    books: renderBooks,
    about: renderAbout
  }

  const handler = routes[hash] || renderHome
  handler(app)
}
