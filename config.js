// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);