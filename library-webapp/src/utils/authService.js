export async function login(email, password) {
  const response = await fetch(
      'http://localhost:3000/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );
  if (!response.ok) {
    throw new Error('Error al iniciar sesión')
  }
  return response.json()
}  

export function getToken() {
  return localStorage.getItem('token');
}

export async function register(user) {

  const response = await fetch(
    'http://localhost:3000/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export function logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  location.hash = '#login';
}

export function isAuthenticated() {

  const token = localStorage.getItem('token');

  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));

  const now = Math.floor(Date.now() / 1000);

  if (payload.exp <= now) {
    logout();
    return false;
  }

  return true;
}