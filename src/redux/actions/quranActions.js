import axios from "axios";
import { setIsLoading, setQuran } from "../reducers/quranReducers";
import { showErrorToast } from "../../components/Toast";

export const getSurah = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/quran/surat/semua`
    );

    if (response.status === 200) {
      dispatch(setQuran(response.data.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    showErrorToast(
      error.response.data.message || error.message || "Terjadi Kesalahan"
    );
  }
};
