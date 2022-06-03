import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANxehM-DKd8JLarOjJYmmkooSpiqF8nM8",
  authDomain: "book-catalog-5a116.firebaseapp.com",
  projectId: "book-catalog-5a116",
  storageBucket: "book-catalog-5a116.appspot.com",
  messagingSenderId: "994685557681",
  appId: "1:994685557681:web:f6c6168d388eb3c78dbb90",
  measurementId: "G-ETYC0H79P2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);