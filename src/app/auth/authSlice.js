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
  "auth/signInWithGoogle",
  async (_, thunkApi) => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const { uid, displayName, photoURL } = result.user;
      //return result.user; //no serializable
      return { uid, displayName, photoURL };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//1. creo el thunk

const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_ , thunkApi ) => {
    try {
      await signOut();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
)

//slice con estado inicial y reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
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
    //2. añado los casos que necesite con addCase
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
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
      })
  },
});

const { setUser } = authSlice.actions;

const initializeAuthListener = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      const { uid, displayName, photoURL } = user;
      dispatch(setUser({ uid, displayName, photoURL }))
    })
  }
}

export { setUser, signInWithGoogle, signOutUser, initializeAuthListener};

export default authSlice.reducer;
