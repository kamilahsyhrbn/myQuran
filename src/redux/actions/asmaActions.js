import axios from "axios";
import { setAsma } from "../reducers/asmaReducers";

export const getAsma = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/husna/semua`
    );
    console.log("response", response);
    if (response?.status === 200) {
      dispatch(setAsma(response?.data?.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(setAsma([]));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
