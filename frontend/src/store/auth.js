import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: localStorage.getItem('authUser') ? true : false,
    authUser: JSON.parse(localStorage.getItem('authUser'))
};

const login = (state, action) => {
    const authUser = { ...action.payload, type: "User" };
    localStorage.setItem('authUser', JSON.stringify(authUser));
    state.authUser = authUser;
    state.isAuthenticated = true;
}

const loginCustomer = (state, action) => {
    const authUser = { ...action.payload, type: "Customer" };
    localStorage.setItem('authUser', JSON.stringify(authUser));
    state.authUser = authUser;
    state.isAuthenticated = true;
}

const logout = (state) => {
    localStorage.clear();
    state.authUser = null;
    state.isAuthenticated = false;
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login,
        logout,
        loginCustomer
    }
});



export const authActions = slice.actions;
export const authReducer = slice.reducer;