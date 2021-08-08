import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "loader",
  initialState: {
    open: false,
  },
  reducers: {
    stopLoading: (state) => {
      state.open = false;
    },
    startLoading: (state) => {
      state.open = true;
    },
    toggleLoading: (state) => {
      state.open = !state.open;

    },
  },
});

export const { stopLoading, startLoading, toggleLoading } = counterSlice.actions;

export default counterSlice.reducer;

