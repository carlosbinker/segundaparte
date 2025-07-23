// Importa el módulo jsonwebtoken para manejar JWT
// const jwt = require("jsonwebtoken");
// Importa el módulo bcrypts para cifrar contraseñas
// const bcrypt = require("bcrypt");
// Importa el modelo de usuarios (array de usuarios)
const users = require("../models/userModel");
// Importa la configurción (clave secreta y duración del token)
const config = require("../config/config");

// Conexión a la BD (tabla users)
var db = require("../db");
/*---------------------------------------------------------------*/

import jwt from "jsonwebtoken";
// Importo el módulo bcrypts para cifrar contraseñas
import bcrypt from "bcrypt";



const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123",
};

async function checkUser(username, password) {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    //login
  }

  //...
}

// Método POST - añadir nuevo producto, el nuevo objeto se recibe mediante req.body
export const addNewProduct = async (req, res) => {
  // const { nombre, precio, vencimiento, perecedero, keyWords } = req.body;
  const producto = req.body;
  console.log(producto);
  if (!producto) {
    return res.status(400).json({ "message": "No se introdujo ningún producto" });
  }
  // const newProduct = await model.addNewProduct({ nombre, precio, vencimiento, perecedero, keyWords });
  const newProduct = await model.addNewProduct(producto);
  res.status(201).json(newProduct);
  console.log("Producto creado exitosamente\n", newProduct);
};




export const register = async (req, res) => {
  const { username, password } = req.body;
const user = req.body;
console.log(user);
if (!user) {
  return res.status(200).json({ message: "No se introdujo ningún producto" });
}

  

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
