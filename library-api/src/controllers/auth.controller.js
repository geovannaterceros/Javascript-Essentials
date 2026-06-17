import { generateToken } from '../utils/jwt.js';
import initialUsers from '../user.json' with { type: 'json' };

const users = [...initialUsers];
export function login(req, res) {
  const { email, password } = req.body;

  const user = users.find(
    user => user.email === email
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      error: 'Invalid credentials'
    });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}



export function register(req, res) {
  const {
    name,
    email,
    password,
    age,
    address,
    phone
  } = req.body;

  // Validación básica
  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email and password are required'
    });
  }

  // Verificar si ya existe
  const existingUser = users.find(
    user => user.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      error: 'User already exists'
    });
  }

  // Crear usuario
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    age,
    address,
    phone
  };

  users.push(newUser);

  //const token = generateToken(newUser);

  res.status(201).json({
    //token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      address: newUser.address,
      phone: newUser.phone
    }
  });
}
