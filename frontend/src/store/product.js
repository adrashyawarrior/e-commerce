import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const addProducts = (state, action) => {
    state.products.push(action.payload.products);
}

const slice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProducts
    }
});

export const productActions = slice.actions;
export const productReducer = slice.reducer;