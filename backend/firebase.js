import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY8gWZ99tsp4o2ZBTHOse-mDZsllNIBu4",
  authDomain: "datacrumps.firebaseapp.com",
  projectId: "datacrumps",
  storageBucket: "datacrumps.firebasestorage.app",
  messagingSenderId: "1013330448426",
  appId: "1:1013330448426:web:f7460dff70fa8ee936f353"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);