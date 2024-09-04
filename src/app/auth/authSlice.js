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

//slice con estado inicial y reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;