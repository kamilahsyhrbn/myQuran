import axios from "axios";
import { setAsma, setIsLoading } from "../reducers/asmaReducers";

export const getAsma = () => async (dispatch) => {
  dispatch(setAsma([]));
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/husna/semua`
    );
    console.log("response", response);
    if (response?.status === 200) {
      dispatch(setAsma(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setAsma([]));
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
