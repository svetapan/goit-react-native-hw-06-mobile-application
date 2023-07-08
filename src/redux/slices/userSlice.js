import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { writeUserToFirestore, registerDB, loginDB, logoutDB } from '../services/userService';

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

export const { registration, logIn, logOut, fetchUserData } = userSlice.actions;
export default userSlice.reducer;

