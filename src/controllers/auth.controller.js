// Importa el módulo jsonwebtoken para manejar JWT
// const jwt = require("jsonwebtoken");
// Importa el módulo bcrypts para cifrar contraseñas
// const bcrypt = require("bcrypt");
// Importa el modelo de usuarios (array de usuarios)
// const users = require("../models/userModel");
// Importa la configurción (clave secreta y duración del token)
// const config = require("../config/config");

// Conexión a la BD (tabla users)
// var db = require("../db");
/*---------------------------------------------------------------*/
import * as model from "../models/User.js";
import jwt from "jsonwebtoken";
// Importo el módulo bcrypts para cifrar contraseñas
import bcrypt from "bcrypt";

// async function checkUser(username, password) {
//   //... fetch user from a db etc.

//   const match = await bcrypt.compare(password, user.passwordHash);

//   if (match) {
//     //login
//   }

//   //...
// }

export const register = async (req, res) => {
  let user = req.body;
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Por favor introduzca el usuario y la contraseña" });
  }
  const { username, password } = req.body;
  // Cifra la contraseña usando bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);
   user = { username, hashedPassword };
    const newUser = await model.addNewUser(user);
    res.status(201).json(newUser);
    console.log("Usuario registrado exitosamente\n", newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  if (email === default_user.email && password === default_user.password) {
    const payload = { id: user.id }; // Para mayor seguridad sólo conviene generar el payload con el ID del usuario
    const expiration = { expiresIn: "1d" };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, expiration);
    res.json({ token }); // Me imprime el token con la clave token
  // } else {
    res.json({ error: "Sus credenciales no coinciden ...." });
  }
};
