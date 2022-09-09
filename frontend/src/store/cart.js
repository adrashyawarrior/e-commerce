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
    state.items = action.payload.items;
    state.itemsTotalAmount = action.payload.itemsTotalAmount;
    state.discountPercentage = action.payload.discountPercentage;
    state.netAmount = action.payload.netAmount;
    state.taxPercentage = action.payload.taxPercentage;
    state.deliveryCharge = action.payload.deliveryCharge;
    state.payableAmount = action.payload.payableAmount;
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