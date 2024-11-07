import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  asma: [],
  isLoading: false,
};

const asmaSlicer = createSlice({
  name: "asma",
  initialState,
  reducers: {
    setAsma: (state, action) => {
      state.asma = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAsma, setIsLoading } = asmaSlicer.actions;
export default asmaSlicer.reducer;
