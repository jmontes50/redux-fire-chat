import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dataReducer from "./db/dbSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
    }
})

export default store;