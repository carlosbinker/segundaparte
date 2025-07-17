// Importo la BD
import { db } from './firebase.js';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore';
// console.log(typeof collection);

const productsCollection = collection(db, "products");
// console.log(productsCollection)

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
        //  const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        // console.log(snapshot);
        return snapshot.exists() ? {id: snapshot.id, ...snapshot.data()}: null;
    } catch (error) {
        console.error(error);
    }
}

// Crear un documento usando el método addDoc va por POST

export const addNewProduct = async (producto) => {
    try {
        const docRef = await addDoc(productsCollection, producto);
        return { id: docRef.id, ...producto };
    } catch (error) {
        console.error(error);
    }
};

// Borrar un producto

export const deletedProductById = async (id) => {
    try {
        const productRef = doc(productsCollection, id);
        console.log(productRef);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            return false;
        }

        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(error);
    }
    
};

export const updateProductById = async (productId, productData) => {
    try {
        const productRef = doc(productsCollection, productId);
        // const snapshot = await getDoc(productRef);
        const docRef = await updateDoc(productRef, productData);

        return { id: productId,  ...productData};
  } catch (error) {
    console.error(error);
  }
};
