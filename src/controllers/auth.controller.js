import { generateToken } from "../utils/token-generator.js";
// Creamos un usuario ficticio para la prueba de autenticación
const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123!",
};

export async function login(req, res) {
  // console.log(req.body);
  // Capturo desde el body el objeto user
  const { email, password } = req.body; 
  // Verificamos las credenciales del usuario que me llega por body
  const payload = {id: 1}; // Sólo con guardar el id del usuario ya es correcto porque con él ya se lo puede buscar en la BD
  if (email === default_user.email && password === default_user.password) {
    // Genero el token sólo si la verificación de las credenciales fue exitosa!
    const token = generateToken(payload);
    res.status(201).json({ "token": token });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
};