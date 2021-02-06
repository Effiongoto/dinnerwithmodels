import axios from "axios";
import {
  ADMIN_CREATE_SUB_FAIL,
  ADMIN_CREATE_SUB_REQUEST,
  ADMIN_CREATE_SUB_SUCCESS,
  ADMIN_DISABLE_SUB_FAIL,
  ADMIN_DISABLE_SUB_REQUEST,
  ADMIN_DISABLE_SUB_SUCCESS,
  ADMIN_ENABLE_SUB_FAIL,
  ADMIN_ENABLE_SUB_REQUEST,
  ADMIN_ENABLE_SUB_SUCCESS,
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

    axios
      .get(
        `https://api.paystack.co/transaction/verify/${reference.reference}`,
        {
          headers: {
            Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Verification successful") {
          axios
            .post(`https://api.paystack.co/subscription`, sub, {
              headers: {
                Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
                "Content-Type": "application/json",
              },
            })
            .then(async (res) => {
              const { data } = await axios.post(
                `/api/payment/subscriptions`,
                { ...res.data.data, user },
                config
              );

              dispatch({
                type: ADMIN_CREATE_SUB_SUCCESS,
                payload: data,
              });

              dispatch(userSubscribe(user._id));
            });
        } else {
          const error = new Error("Payment Verification failed");
          dispatch({
            type: ADMIN_CREATE_SUB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      });
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

export const enableSub = (sub, id, user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_ENABLE_SUB_REQUEST,
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

    axios
      .post(`https://api.paystack.co/subscription/enable`, sub, {
        headers: {
          Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log("payres", res.data);
        if (res.data.message === "Subscription enabled successfully") {
          const { data } = await axios.patch(
            `/api/payment/subscriptions/${id}/enable`,
            { status: "active" },
            config
          );

          dispatch({
            type: ADMIN_ENABLE_SUB_SUCCESS,
            payload: data,
          });

          localStorage.setItem("sub", JSON.stringify(data));

          dispatch(updateUser(user));
        } else {
          const error = new Error("Enable subscription failed");
          dispatch({
            type: ADMIN_ENABLE_SUB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ADMIN_ENABLE_SUB_FAIL,
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

    axios
      .post(`https://api.paystack.co/subscription/disable`, sub, {
        headers: {
          Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log("payres", res.data);
        if (res.data.message === "Subscription disabled successfully") {
          const { data } = await axios.patch(
            `/api/payment/subscriptions/${id}/disable`,
            { status: "inactive" },
            config
          );

          dispatch({
            type: ADMIN_DISABLE_SUB_SUCCESS,
            payload: data,
          });

          localStorage.setItem("sub", JSON.stringify(data));

          dispatch(updateUser(user));
        } else {
          const error = new Error("Disable subscription failed");
          dispatch({
            type: ADMIN_DISABLE_SUB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      });
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
