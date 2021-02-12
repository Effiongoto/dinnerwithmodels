import axios from "axios";
import {
  PAYSTACK_KEYS_REQUEST,
  PAYSTACK_KEYS_SUCCESS,
  PAYSTACK_KEYS_FAIL,
} from "../constants/paystackConstants";

export const getPaystackKeys = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYSTACK_KEYS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/config/paystack", config);

    dispatch({
      type: PAYSTACK_KEYS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYSTACK_KEYS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
