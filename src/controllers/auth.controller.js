import jwt from "jsonwebtoken";

const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123",
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  if (email === default_user.email && password === default_user.password) {
    const payload = { id: user.id }; // Para mayor seguridad sólo conviene generar el payload con el ID del usuario
    const expiration = { expiresIn: "1d" };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, expiration);
    res.json({ token }); // Me imprime el token con la clave token
  } else {
    res.json({ error: "Sus credenciales no coinciden ...." });
  }
};