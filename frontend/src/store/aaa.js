import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { cartReducer } from "./cart";

const store = configureStore({
    reducer: {
        authStore: authReducer,
        cartStore: cartReducer
    }
});

export default store;