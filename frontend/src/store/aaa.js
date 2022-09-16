import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { cartReducer } from "./cart";
import { productReducer } from "./product";

const store = configureStore({
    reducer: {
        authStore: authReducer,
        cartStore: cartReducer,
        productStore: productReducer
    }
});

export default store;