import {
  PAYSTACK_KEYS_REQUEST,
  PAYSTACK_KEYS_SUCCESS,
  PAYSTACK_KEYS_FAIL,
} from "../constants/paystackConstants";

export const paystackKeysReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYSTACK_KEYS_REQUEST:
      return { loading: true };
    case PAYSTACK_KEYS_SUCCESS:
      return { loading: false, keys: action.payload };
    case PAYSTACK_KEYS_FAIL:
      return { loading: false, keys: action.payload };
    default:
      return state;
  }
};
