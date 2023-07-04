import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../config";
import { collection, addDoc } from "firebase/firestore";

export const writeUserToFirestore = async (login, email, password) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      login: login,
      email: email,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const registerDB = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const loginDB = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logoutDB = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
