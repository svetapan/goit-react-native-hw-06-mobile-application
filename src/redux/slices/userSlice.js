import { createSlice } from '@reduxjs/toolkit';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut, 
// } from "firebase/auth";
// import { auth, db } from '../../../config';
// import { collection, addDoc } from "firebase/firestore";
import { initialState } from '../initialState';
import { writeUserToFirestore, registerDB, loginDB, logoutDB } from '../services/userService';

// const writeUserToFirestore = async (login, email, password) => {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       login: login,
//       email: email,
//       password: password,
//     });
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//       throw e;
//   }
// };

// const registerDB = async (email, password) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw error;
//   }
// };

// const loginDB = async (email, password) => {
//   try {
//     const credentials = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// const logoutDB = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out successfully");
//   } catch (error) {
//     console.log("Logout error:", error);
//   }
// };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    registration: (state, action) => {
      state.user = action.payload;
      console.log('registration', state.user);
      registerDB(state.user.email, state.user.password)
      writeUserToFirestore(state.user.login, state.user.email, state.user.password)
    },
    logIn: (state, action) => {
      state.user = action.payload;
      console.log('login', state.user.email, state.user.password);
      loginDB(state.user.email, state.user.password);
    },
    logOut: (state) => {
      state.user = null;
      console.log('logout', state.user);
      logoutDB();
    },
  },
});

export const { registration, logIn, logOut } = userSlice.actions;
export default userSlice.reducer;

