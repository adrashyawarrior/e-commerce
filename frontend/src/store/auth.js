import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false
};

const login = (state) => {
    state.isAuthenticated = true;
}

const logout = (state) => {
    state.isAuthenticated = false;
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login,
        logout
    }
});



export const authActions = slice.actions;
export const authReducer = slice.reducer;