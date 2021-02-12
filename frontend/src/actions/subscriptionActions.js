import axios from "axios";
import {
  ADMIN_CREATE_SUB_FAIL,
  ADMIN_CREATE_SUB_REQUEST,
  ADMIN_CREATE_SUB_SUCCESS,
  ADMIN_DISABLE_SUB_FAIL,
  ADMIN_DISABLE_SUB_REQUEST,
  ADMIN_DISABLE_SUB_SUCCESS,
  SUB_DETAILS_FAIL,
  SUB_DETAILS_REQUEST,
  SUB_DETAILS_SUCCESS,
  SUB_LIST_FAIL,
  SUB_LIST_REQUEST,
  SUB_LIST_SUCCESS,
} from "../constants/subscriptionConstants";
import { updateUser, userSubscribe } from "./userActions";

export const createSub = (sub, user, reference) => async (
  dispatch,
  getstate
) => {
  try {
    dispatch({
      type: ADMIN_CREATE_SUB_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/payment/subscriptions`,
      { reference, user, sub },
      config
    );

    dispatch({
      type: ADMIN_CREATE_SUB_SUCCESS,
      payload: data,
    });

    dispatch(userSubscribe(user._id));
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_SUB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/payment/subscriptions`, config);

    dispatch({
      type: SUB_LIST_SUCCESS,
      payload: data,
    });

    localStorage.setItem("subs", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SUB_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSubDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/payment/subscriptions/${id}`,
      config
    );

    dispatch({
      type: SUB_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("sub", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SUB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const disableSub = (sub, id, user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DISABLE_SUB_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/payment/subscriptions/${id}/disable`,
      sub,
      config
    );

    dispatch({
      type: ADMIN_DISABLE_SUB_SUCCESS,
      payload: data,
    });

    localStorage.setItem("sub", JSON.stringify(data));

    dispatch(updateUser(user));
  } catch (error) {
    dispatch({
      type: ADMIN_DISABLE_SUB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
