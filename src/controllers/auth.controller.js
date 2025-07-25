import * as model from "../models/User.js";
import jwt from "jsonwebtoken";
// Importo el módulo bcrypts para cifrar contraseñas
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  let user = req.body;
  console.log(user);
  console.log(typeof user);
  if (
    typeof user !== "object" ||
    user === null ||
    Object.keys(user).length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Por favor introduzca el usuario y la contraseña" });
  }
  console.log(Object.keys(user));
  if (Object.keys(user)[0] == "username" && Object.keys(user)[1] == "password")
  {
    const { username, password } = req.body;
    console.log(username, password);
    // Cifra la contraseña usando bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    user = { username, hashedPassword };
    const newUser = await model.addNewUser(user);
    res.status(201).json(newUser);
    console.log("Usuario registrado exitosamente\n", newUser);
  } else {
    console.log("Objeto user con claves incorrectas\n");
    return res
      .status(400)
      .json({
        "Formato del json del body": { username: "string", password: "string" },
      });
  }
    
};

async function checkUser(username, password) {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    //login
  }

  //...
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  // const user = { id: 1, email };

  if (email === default_user.email && password === default_user.password) {
    const payload = { id: user.id }; // Para mayor seguridad sólo conviene generar el payload con el ID del usuario
    const expiration = { expiresIn: "1d" };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, expiration);
    res.json({ token }); // Me imprime el token con la clave token
  } else {
    res.json({ error: "Sus credenciales no coinciden ...." });
  }
};
