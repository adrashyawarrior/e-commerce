import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    itemsTotalAmount: 0,
    discountPercentage: 0,
    netAmount: 0,
    taxPercentage: 0,
    deliveryCharge: 0,
    payableAmount: 0
};

const updateCart = (state, action) => {
    state = action.payload;
};

const slice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        updateCart
    }
});

export const cartActions = slice.actions;
export const cartReducer = slice.reducer;