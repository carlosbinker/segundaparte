// Importo la BD
import { db } from './firebase.js';

import { addDoc, collection, doc, getDoc, getDocs} from 'firebase/firestore';
// console.log(typeof collection);

const productsCollection = collection (db, "products");

// *********************Métodos GET*************************************
//getAllProdusts
export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};

//getProductById
export const getProductById = async (id) => {

    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        return snapshot.exists() ? {id: snapshot.id, ...snapshot.data()}: null;
    } catch (error) {
        console.error(error);
    }
}

// Crear un documento usando el método addDoc va por POST

export const addNewProduct =  async (data) => {
    try {
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(error);
    }
}