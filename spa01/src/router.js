import { renderHome } from './views/home.js'
import { renderForm } from './views/form.js'
import { renderProfile } from './views/profile.js'
import { renderNews } from './views/news.js'

export function navigate(route) {
  const app = document.getElementById('app')

  if (route === 'home') {
    renderHome(app)
  } else if (route === 'form') {
    renderForm(app)
  } else if (route === 'profile') {
    renderProfile(app)
  } else if (route === 'news') {
    renderNews(app)
  }
   else {
    app.innerHTML = "<h3> 404 </h3>"
  }
}
