// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCrU1J2WdKRXQBU0qXYdKUDyGXSAYT-RBU",
  authDomain: "shees-35c5b.firebaseapp.com",
  projectId: "shees-35c5b",
  storageBucket: "shees-35c5b.appspot.com",
  messagingSenderId: "826924476601",
  appId: "1:826924476601:web:ac50e0a87edd0e14c25368"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
