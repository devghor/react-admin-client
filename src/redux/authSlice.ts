import { createSlice } from "@reduxjs/toolkit";
import { constValue } from "../values";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: localStorage.getItem(constValue.TOKEN_KEY) ? true : false,
    token: localStorage.getItem(constValue.TOKEN_KEY),
    user: localStorage.getItem(constValue.USER_KEY),
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(constValue.TOKEN_KEY, JSON.stringify(action.payload));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(constValue.USER_KEY, action.payload);
    },
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(constValue.TOKEN_KEY, action.payload.token);
      localStorage.setItem(constValue.USER_KEY, JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem(constValue.TOKEN_KEY);
      localStorage.removeItem(constValue.USER_KEY);
    },
  },
});

export const { setUserToken, setUser, login, logout } = counterSlice.actions;

export default counterSlice.reducer;