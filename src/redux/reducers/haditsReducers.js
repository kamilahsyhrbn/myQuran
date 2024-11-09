import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hadits: [],
  selectedHadits: [],
  isLoading: false,
};

const haditsSlicer = createSlice({
  name: "hadits",
  initialState,
  reducers: {
    setHadits: (state, action) => {
      state.hadits = action.payload;
    },
    setSelectedHadits: (state, action) => {
      state.selectedHadits = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setHadits, setSelectedHadits, setIsLoading } =
  haditsSlicer.actions;
export default haditsSlicer.reducer;
