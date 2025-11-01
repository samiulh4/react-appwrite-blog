import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  authData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.isAuthenticated = true;
            state.authData = action.payload;
        },
        clearAuthData: (state) => {
            state.isAuthenticated = false;
            state.authData = null;
        }
    }
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;