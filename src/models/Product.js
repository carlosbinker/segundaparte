import { db } from './firebase.js';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const productsCollection = collection (db, "products");

// *********************Métodos get*************************************
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
