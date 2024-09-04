import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    signInWithPopup, 
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider
  } from 'firebase/auth';

const authSlice = createSlice({
    name: 'auth',
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