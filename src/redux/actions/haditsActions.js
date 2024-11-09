import axios from "axios";
import { setHadits, setIsLoading } from "../reducers/haditsReducers";

export const getHadits = () => async (dispatch) => {
  dispatch(setHadits([]));
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/hadits/arbain/semua`
    );
    if (response?.status === 200) {
      dispatch(setHadits(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setHadits([]));
    dispatch(setIsLoading(false));
    showErrorToast(error.message || "Terjadi Kesalahan");
  }
};
