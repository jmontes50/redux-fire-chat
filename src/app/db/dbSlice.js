import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const addDocument = createAsyncThunk(
  "data/addDocument",
  async (documento, thunkApi) => {
    try {
      const docRef = await addDoc(collection(db, "mensajes"), documento);
      // console.log("Nuevo Doc", docRef)
      return { id: docRef.id, ...documento };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
        state.error = action.payload;
      });
  },
});

const { setDocuments } = dataSlice.actions;

const listenCollection = () => {
  return (dispatch) => {
    let consulta = query(collection(db, "mensajes"), orderBy('timestamp'));
    //snapshot la foto de la db en base a la consulta en ese momento del tiempo
    onSnapshot(consulta, (snapshot) => {
      // console.log(snapshot)
      const documentos = snapshot.docs.map((doc) => {
        //data me permite acceder a la información de cada documento
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setDocuments(documentos));
    });
  };
};

export { setDocuments, addDocument, listenCollection };

export default dataSlice.reducer;
