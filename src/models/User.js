// Importo la BD
import { db } from "./firebase.js";

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
// console.log(typeof collection);

const usersCollection = collection(db, "users");
// console.log(productsCollection)

//getAllProdusts --- Empleo de getDocs -- Traemos todos los documentos
export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};

//getProductById --- Empleo de getDoc -- Trae un solo documento dado por el id
export const getuserById = async (id) => {
    try {
        const userRef = doc(usersCollection, id);
        //  const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(userRef);
        // console.log(snapshot);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.error(error);
    }
};

// addNewProduct --- Empleo de addDoc -- Crea un nuevo documento con cualquier estructura, el id lo genera automáticamente con un hash
export const addNewUser = async (user) => {
    try {
        const docRef = await addDoc(usersCollection, user);
        return { id: docRef.id, ...user };
    } catch (error) {
        console.error(error);
    }
};