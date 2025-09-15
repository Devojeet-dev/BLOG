// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blog-bcdc9.firebaseapp.com",
  projectId: "blog-bcdc9",
  storageBucket: "blog-bcdc9.firebasestorage.app",
  messagingSenderId: "542702525599",
  appId: "1:542702525599:web:f4888e2c8e92b0eda9d6aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =  getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}