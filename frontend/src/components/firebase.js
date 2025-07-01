// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMt2C_byPej8eepcRyWZEyDlqAju3WkLU",
  authDomain: "crumpslogin.firebaseapp.com",
  projectId: "crumpslogin",
  storageBucket: "crumpslogin.firebasestorage.app",
  messagingSenderId: "5230972725",
  appId: "1:5230972725:web:7af2746eb846533031467c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();