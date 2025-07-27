import * as model from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const user = req.body;
  // console.log(user);
  // console.log(typeof user);
  // console.log(Object.keys(user));
  if (typeof user !== "object" || user === null || Object.keys(user).length === 0) {
    return res.status(400).json({ "Formato del json del body": { username: "string", password: "string" } });
  } else if (Object.keys(user)[0] !== "username" || Object.keys(user)[1] !== "password") {
    return res.status(400).json({ "Formato del json del body": { username: "string", password: "string" } });
  } else {
    const newUser = await model.addNewUser(user);
    res.status(201).json(newUser);
    console.log("Usuario registrado exitosamente\n", newUser);
  }
};

export const login = async (req, res) => {
  const user = req.body;

  if (
    typeof user !== "object" ||
    user === null ||
    Object.keys(user).length === 0
  ) {
    return res
      .status(400)
      .json({
        "Formato del json del body": { username: "string", password: "string" },
      });
  } else if (
    Object.keys(user)[0] !== "username" ||
    Object.keys(user)[1] !== "password"
  ) {
    return res
      .status(400)
      .json({
        "Formato del json del body": { username: "string", password: "string" },
      });
  }

  const token = await model.token(user);

  if (!token) {
  res.status(400).json({ error: "Sus credenciales no coinciden ...." });
}
    res.status(201).json({ token }); // Me imprime el token con la clave token
};
