import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const store = configureStore({
    reducer: {
        authStore: authReducer
    }
});

export default store;