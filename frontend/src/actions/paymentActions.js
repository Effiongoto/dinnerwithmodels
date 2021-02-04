import axios from "axios";
import {
  ADMIN_CREATE_PLAN_FAIL,
  ADMIN_CREATE_PLAN_REQUEST,
  ADMIN_CREATE_PLAN_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  ADMIN_DELETE_PLAN_FAIL,
  ADMIN_DELETE_PLAN_REQUEST,
  ADMIN_DELETE_PLAN_SUCCESS,
} from "../constants/paymentConstants";

export const createPlan = (plan) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_CREATE_PLAN_REQUEST,
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
      .post(`https://api.paystack.co/plan`, plan, {
        headers: {
          Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
        },
      })
      .then(async (res) => {
        const { data } = await axios.post(
          "/api/payment/plans",
          res.data.data,
          config
        );

        dispatch({
          type: ADMIN_CREATE_PLAN_SUCCESS,
          payload: data,
        });

        dispatch(listPlans());

        localStorage.setItem("plan", JSON.stringify(data));
      });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_PLAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPlans = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAN_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/payment/plans`, config);

    dispatch({
      type: PLAN_LIST_SUCCESS,
      payload: data,
    });

    localStorage.setItem("plans", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PLAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePlan = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_PLAN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/payment/plans/${id}`, config).then(() => dispatch(listPlans()));

    dispatch({ type: ADMIN_DELETE_PLAN_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PLAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
