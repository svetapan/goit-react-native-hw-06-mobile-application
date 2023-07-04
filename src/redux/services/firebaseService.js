import { createAsyncThunk} from "@reduxjs/toolkit";
import { auth } from "../../../config"; 

export const signIn = createAsyncThunk(
  "firebase/signIn",
  async (credentials, thunkAPI) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "firebase/signUp",
  async (newUser, thunkAPI) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      );
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "firebase/signOut",
  async (_, thunkAPI) => {
    try {
      await auth.signOut();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);