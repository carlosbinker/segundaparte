import { generateToken } from "../utils/token-generator.js";
// Creamos un usuario ficticio para la prueba de autenticación
const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123!",
};

export async function login(req, res) {
  // Capturo desde el body el objeto default_user
  const { email, password } = req.body;

  // Verificamos las credenciales del usuario
  const user = { id: 1, email }; // Sólo pasamos el email, la password no por seguridad!
  if (email === default_user.email && password === default_user.password) {
    // Genero el token sólo si la verificación de las credenciales fue exitosa!
    const token = generateToken(user);
      res.status(201).json({ "token": token });
  } else {
    res.sendStatus(401).json({ message: "Unauthorized user" });
  }
};