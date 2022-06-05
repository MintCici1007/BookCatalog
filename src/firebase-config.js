import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSRQ9PQ5i2YMNLFDye3DUBZd6AkFEIr64",
  authDomain: "book-catalog-f44ab.firebaseapp.com",
  projectId: "book-catalog-f44ab",
  storageBucket: "book-catalog-f44ab.appspot.com",
  messagingSenderId: "464071128506",
  appId: "1:464071128506:web:c5b3a4f51bd2b2ea3d1983",
  measurementId: "G-VTG3YDBVMG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
