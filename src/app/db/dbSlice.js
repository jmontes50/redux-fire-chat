import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const addDocument = createAsyncThunk(
  'data/addDocument',
  async (documento, thunkApi) => {
    try {
      const docRef = await addDoc(collection(db, "mensajes"), documento);
      // console.log("Nuevo Doc", docRef)
      return { id: docRef.id, ...documento }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

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
  extraReducers: (builder) => {
    builder
    .addCase(addDocument.pending, (state) => {
      state.loading = true;
    })
    .addCase(addDocument.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(addDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
  }
});

const { setDocuments } = dataSlice.actions;

export { setDocuments, addDocument } 

export default dataSlice.reducer;