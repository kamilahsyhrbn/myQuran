import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quran: [],
  surah: [],
  selectedSurah: [],
  tafsirAyah: [],
  selectedAyah: null,
  isLoading: false,
};

const quranSlicer = createSlice({
  name: "quran",
  initialState,
  reducers: {
    setQuran: (state, action) => {
      state.quran = action.payload;
    },
    setSurah: (state, action) => {
      state.surah = action.payload;
    },
    setSelectedSurah: (state, action) => {
      state.selectedSurah = action.payload;
    },

    setTafsirAyah: (state, action) => {
      state.tafsirAyah = action.payload;
    },
    setSelectedAyah: (state, action) => {
      state.selectedAyah = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setQuran,
  setSurah,
  setSelectedSurah,
  setTafsirAyah,
  setSelectedAyah,
  setIsLoading,
} = quranSlicer.actions;

export default quranSlicer.reducer;
