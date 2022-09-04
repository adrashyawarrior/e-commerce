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

const addItem = (state, action) => {
    const item = action.payload.item;
    if (state.items.some(key => key === item._id)) {
        state.items[item._id] = { item: item, quantity: state.items[item._id].quantity + 1 };
    } else {
        state.items[item._id] = { item: item, quantity: 1 };
    }
    state.itemsTotalAmount += item.price;
    state.netAmount = state.itemsTotalAmount;
    state.payableAmount = state.netAmount;
};

const removeItem = (state, action) => {
    const item = action.payload.item;
    if (state.items.some(key => key === item._id)) {
        state.itemsTotalAmount -= (item.price * state.items[item._id].quantity);
        state.netAmount = state.itemsTotalAmount;
        state.payableAmount = state.netAmount;
        state.items.splice(item._id, 1);
    }

};

const slice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem,
        removeItem
    }
});

export const cartActions = slice.actions;
export const cartReducer = slice.reducer;