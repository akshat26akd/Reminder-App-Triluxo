import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANSpL8Ziduh6FENGf1WkNx5Vw81iNmfjs",
  authDomain: "reminder-app-26.firebaseapp.com",
  projectId: "reminder-app-26",
  storageBucket: "reminder-app-26.appspot.com",
  messagingSenderId: "111089178550",
  appId: "1:111089178550:web:abab2de3729767dfe65317",
  measurementId: "G-YWM5TPJ1Z8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
