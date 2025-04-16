// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tripcraft-be580.firebaseapp.com",
  projectId: "tripcraft-be580",
  storageBucket: "tripcraft-be580.firebasestorage.app",
  messagingSenderId: "922049023520",
  appId: "1:922049023520:web:b5b1afcf47f2fa88c63645",
  measurementId: "G-98SV8FMK0B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);