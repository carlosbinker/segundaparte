// Importo la BD
import { db } from "./firebase.js";
import jwt from "jsonwebtoken";
// Importo el módulo bcrypts para cifrar contraseñas
import bcrypt from "bcrypt";
import "dotenv/config";
const secret_key = process.env.JWT_SECRET_KEY;

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

//Obtener el id del usuario logueado
export const token = async (user) => {
  const { username, password } = user;
  
  try {
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    if (querySnapshot.empty) {
      console.log("Credenciales incorrectas");
      return false;
    }
    // Si esperas un solo resultado, obtén el primer documento

    const userDoc = querySnapshot.docs[0];
    // Accede a los datos del documento usando .data()
    const userData = userDoc.data();
    // Ahora puedes acceder a las propiedades del usuario, como hashedPassword
    const match = await bcrypt.compare(password, userData.hashedPassword);
    if (match) {
      const payload = { id: userDoc.id }; // Para mayor seguridad sólo conviene generar el payload con el ID del usuario
      const expiration = { expiresIn: "1d" };
      return jwt.sign(payload, secret_key, expiration); // Devuelvo el token del usuario logueado
    } else {
      return false;
    }
  }
  catch (error) {
    console.error("Error en la función  token: error");
    return false; //INdica que hubo un error
  }
};

// addNewUser -- register
export const addNewUser = async (user) => {
  try {
     const { username, password } = user;
      // Cifra la contraseña usando bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    user = { username, hashedPassword };

    const docRef = await addDoc(usersCollection, user);
    // console.log(docRef);
        return {id: docRef.id}; // Devuelvo sólo el id del usuario registrado
    } catch (error) {
        console.error(error);
    }
};