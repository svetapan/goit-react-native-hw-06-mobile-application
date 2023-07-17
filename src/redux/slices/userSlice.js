import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import {
  logoutDB,
  writeUserToFirestore,
  registerDB,
  loginDB,
  updateUserProfile,
} from "../services/userService";
import { auth } from "../../../config";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registration: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: async ({ login, email, password }) => {
        await registerDB(email, password);
        await updateUserProfile({
          displayName: login,
        });

        const userUpdateSucces = auth.currentUser;
        console.log("Registration and login into", auth.currentUser.email);
        return userUpdateSucces;
      },
    },
    logIn: {
      reducer: (state, action) => {
        console.log(1, action.payload);

        state.user = action.payload;
      },
      prepare: async (user) => {
        await loginDB(user.email, user.password);
        const userUpdateSucces = auth.currentUser;
        console.log("Logedin into", auth.currentUser);
        console.log(2, action.payload);
        return userUpdateSucces;
        // return { payload: { email: user.email, password: user.password } };
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
