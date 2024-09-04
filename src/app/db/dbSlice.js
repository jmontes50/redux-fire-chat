import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
  },
});

const { setDocuments } = dataSlice.actions;

export default dataSlice.reducer;