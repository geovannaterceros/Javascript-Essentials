import { router } from './router.js'

const app = document.getElementById('app')

// Initialize the application
function init() {
  setupRouting()
}

function setupRouting() {
  window.addEventListener('hashchange', () => {
    router(window.location.hash)
  })

  // Initial route
  router(window.location.hash)
}

init()
