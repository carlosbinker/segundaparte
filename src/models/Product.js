// Importo la BD
import { db } from './firebase.js';

import {collection, doc, getDocs, getDoc, addDoc, updateDoc, setDoc, deleteDoc} from 'firebase/firestore';
// console.log(typeof collection);

const productsCollection = collection(db, "products");
// console.log(productsCollection)

// *********************Métodos GET*************************************
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
export const getProductById = async (id) => {
    try {
        const productRef = doc(productsCollection, id);
        //  const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        // console.log(snapshot);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.error(error);
    }
};


// addNewProduct --- Empleo de addDoc -- Crea un nuevo documento con cualquier estructura, el id lo genera automáticamente con un hash
export const addNewProduct = async (producto) => {
    try {
        const docRef = await addDoc(productsCollection, producto);
        return { id: docRef.id, ...producto };
    } catch (error) {
        console.error(error);
    }
};

// PUT mejorado verificando primero si el producto existe y usando setDoc, acá se pisa completamente el producto con la nueva estructura
export async function updatePutProductById(id, productData) {
    try {
        if (!productData) productData = {};
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }
      
    await setDoc(productRef, productData); // reemplazo completo
    return { id, ...productData };
  } catch (error) {
    console.error(error);
  }
};

// PATCH -- Emplea updateDoc -- El producto no cambia su estructura, se modifican los campos o se pueden agregar otros nuevos
export const updatePatchProductById = async (productId, productData) => {
    try {
        // console.log(productData);
        if (!productData)
            productData = {};
    const productRef = doc(productsCollection, productId);
    const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
          return false;
        }
     
    await updateDoc(productRef, productData);
    return { id: productId, ...productData };
  } catch (error) {
    console.error(error);
  }
};

// Borrar un producto a partir del id --- deletProducById --- Usamos deleteDoc
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


