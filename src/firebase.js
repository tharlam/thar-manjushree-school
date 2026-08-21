import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEhCCxKVQLziM5FtPnK07stmo2qtnuRY4",
  authDomain: "thar-manjushree.firebaseapp.com",
  projectId: "thar-manjushree",
  storageBucket: "thar-manjushree.firebasestorage.app",
  messagingSenderId: "623084207389",
  appId: "1:623084207389:web:e35e489b6def39be6c75f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
