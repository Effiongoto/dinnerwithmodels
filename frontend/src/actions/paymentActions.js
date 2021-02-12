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
  ADMIN_PLAN_DETAILS_FAIL,
  ADMIN_PLAN_DETAILS_REQUEST,
  ADMIN_PLAN_DETAILS_SUCCESS,
  ADMIN_UPDATE_PLAN_FAIL,
  ADMIN_UPDATE_PLAN_REQUEST,
  ADMIN_UPDATE_PLAN_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
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
          "Content-Type": "application/json",
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

    await axios
      .delete(`/api/payment/plans/${id}`, config)
      .then(() => dispatch(listPlans()));

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

export const getPlanDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_PLAN_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/payment/plans/${id}`, config);

    dispatch({
      type: ADMIN_PLAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PLAN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePlan = (plan) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_PLAN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `https://api.paystack.co/plan/${plan.planCode}`,
        { name: plan.name, amount: plan.amount },
        {
          headers: {
            Authorization: `Bearer sk_test_02c6bf4338249786fecffb3cb1ba9ce59e1efe67`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        if (res.data.status === true) {
          await axios.patch(`/api/payment/plans/${plan._id}`, plan, config);

          dispatch({ type: ADMIN_UPDATE_PLAN_SUCCESS });
        }
      });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PLAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyTransaction = (ref) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_DETAILS_REQUEST,
    });

    const {
      paystackKey: { keys },
    } = getState();

    await axios
      .get(`https://api.paystack.co/transaction/verify/${ref}`, {
        headers: {
          Authorization: keys.secretKey,
        },
      })
      .then((res) => {
        if (res.data.message === "Verification successful") {
          dispatch({
            type: TRANSACTION_DETAILS_SUCCESS,
            payload: res.data.data,
          });
        } else {
          const error = new Error("Payment Verification failed");
          dispatch({
            type: TRANSACTION_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
