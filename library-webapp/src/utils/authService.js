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