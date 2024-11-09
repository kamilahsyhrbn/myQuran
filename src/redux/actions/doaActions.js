import axios from "axios";
import { setDoa, setIsLoading, setListDoa } from "../reducers/DoaReducers";

export const getListDoa = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setListDoa([]));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/doa/sumber`
    );
    if (response?.status === 200) {
      dispatch(setListDoa(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setListDoa([]));
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};

export const getDoa = (sumber) => async (dispatch) => {
  dispatch(setDoa([]));
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/doa/sumber/${sumber}`
    );
    if (response?.status === 200) {
      dispatch(setDoa(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setDoa([]));
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
