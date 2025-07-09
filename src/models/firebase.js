// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeMNnU6IluNlqF-jCprIIKFEUsBsD0lQI",
  authDomain: "clase-14-92ede.firebaseapp.com",
  projectId: "clase-14-92ede",
  storageBucket: "clase-14-92ede.firebasestorage.app",
  messagingSenderId: "555028552453",
  appId: "1:555028552453:web:a452e919babe48ee1cf56c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
