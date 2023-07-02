import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../../config';

export const signIn = createAsyncThunk('firebase/signIn', async (credentials, thunkAPI) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return userCredential.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk('firebase/signUp', async (newUser, thunkAPI) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    return userCredential.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signOut = createAsyncThunk('firebase/signOut', async (_, thunkAPI) => {
  try {
    await auth.signOut();
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});