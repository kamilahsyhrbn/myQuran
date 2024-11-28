import axios from "axios";
import {
  setIsLoading,
  setQuran,
  setSelectedSurah,
  setTafsirAyah,
} from "../reducers/quranReducers";
import { showErrorToast } from "../../components/Toast";

export const getSurah = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setQuran([]));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/surat`
    );
    if (response?.status === 200) {
      dispatch(setQuran(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    dispatch(setQuran([]));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};

export const getDetailSurah = (nomor) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setSelectedSurah(null));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/surat/${nomor}`
    );
    if (response?.status === 200) {
      dispatch(setSelectedSurah(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    dispatch(setSelectedSurah(null));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};

export const getTafsirAyah = (nomor) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setTafsirAyah([]));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/tafsir/${nomor}`
    );
    if (response?.status === 200) {
      dispatch(setTafsirAyah(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setTafsirAyah([]));
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
