import { db } from './firebase.js';

import { collection, getDocs } from 'firebase/firestore';

const productsCollection = collection (db, "products");

export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
    }
};
