import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initialState } from "../initialState";
import { logoutDB, writeUserToFirestore } from "../services/userService";
import { auth } from "../../../config";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registration: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: ({ login, email, password }) => {
        const regtoData = async ({ login, email, password }) =>{
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(auth.currentUser, {
            displayName: login,
          });
        }
        
        regtoData();
        writeUserToFirestore(login, email, password);
        
        return {  payload: { login, email, password } };
      },
    },
    logIn: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: (user) => {
        return { payload: { email: user.email, password: user.password } };
      },
    },
    logOut: (state) => {
      state.user = {};
      console.log("logout", state.user);
      logoutDB();
    },
  },
});

export const { registration, logIn, logOut, fetchUserData } = userSlice.actions;
export default userSlice.reducer;
