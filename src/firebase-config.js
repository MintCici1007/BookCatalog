import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzUF53Jv8aqJWFv76g6tuYHSZx6ywO-tI",
  authDomain: "minh-b57d6.firebaseapp.com",
  projectId: "minh-b57d6",
  storageBucket: "minh-b57d6.appspot.com",
  messagingSenderId: "672897516817",
  appId: "1:672897516817:web:ca84ab31bbf816705fb8b0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
