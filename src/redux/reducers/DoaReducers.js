import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listDoa: [],
  doa: [],
  selectedDua: [],
  isLoading: false,
};

const doaSlicer = createSlice({
  name: "doa",
  initialState,
  reducers: {
    setListDoa: (state, action) => {
      state.listDoa = action.payload;
    },
    setDoa: (state, action) => {
      state.doa = action.payload;
    },
    setSelectedDua: (state, action) => {
      state.selectedDua = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setListDoa, setDoa, setSelectedDua, setIsLoading } =
  doaSlicer.actions;
export default doaSlicer.reducer;
