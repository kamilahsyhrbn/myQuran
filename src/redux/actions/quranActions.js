import axios from "axios";
import {
  setIsLoading,
  setQuran,
  setSelectedSurah,
} from "../reducers/quranReducers";
import { showErrorToast } from "../../components/Toast";

export const getSurah = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/surat`
    );
    console.log("response", response?.data?.data);
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
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/surat/${nomor}`
    );
    console.log("response", response);
    if (response?.status === 200) {
      dispatch(setSelectedSurah(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};

export const getTafsirSurah = (nomor) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_QURAN_SERVER}/tafsir/${nomor}`
    );
    console.log("response", response);
    if (response?.status === 200) {
      dispatch(setTafsirAyah(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
