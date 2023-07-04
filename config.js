import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoPzp4SOx3AMmOgFvAdatxIkIfCbE8_9I",
  authDomain: "mobile-application-f1d57.firebaseapp.com",
  databaseURL: "https://mobile-application-f1d57-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobile-application-f1d57",
  storageBucket: "mobile-application-f1d57.appspot.com",
  messagingSenderId: "83219767456",
  appId: "1:83219767456:web:4a0687df89dd77fa5b69c5",
  measurementId: "G-J1Q4E9ZR5P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);