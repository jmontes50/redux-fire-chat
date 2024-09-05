//importamos createSlice y createAsyncThunk para crear el slice y los thunks necesarios para redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//importamos los metodos necesarios para el login
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../config/firebase";

//thunks
//accion asincrona para iniciar sesión con Google
//provider de google
const providerGoogle = new GoogleAuthProvider();

const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, thunkApi) => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      return true;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

//slice con estado inicial y reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;