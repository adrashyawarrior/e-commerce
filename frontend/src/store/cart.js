import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
    items: cart ? cart.items : [],
    itemsTotalAmount: cart ? cart.itemsTotalAmount : 0,
    discountPercentage: cart ? cart.discountPercentage : 0,
    netAmount: cart ? cart.netAmount : 0,
    taxPercentage: cart ? cart.taxPercentage : 0,
    deliveryCharge: cart ? cart.deliveryCharge : 0,
    payableAmount: cart ? cart.payableAmount : 0
};

const updateCart = (state, action) => {
    localStorage.setItem('cart', JSON.stringify(action.payload));
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