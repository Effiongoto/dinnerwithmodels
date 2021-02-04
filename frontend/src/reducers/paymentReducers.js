import {
  ADMIN_CREATE_PLAN_FAIL,
  ADMIN_CREATE_PLAN_REQUEST,
  ADMIN_CREATE_PLAN_SUCCESS,
  //   ADMIN_UPDATE_PLAN_FAIL,
  //   ADMIN_UPDATE_PLAN_REQUEST,
  //   ADMIN_UPDATE_PLAN_SUCCESS,
  ADMIN_DELETE_PLAN_FAIL,
  ADMIN_DELETE_PLAN_REQUEST,
  ADMIN_DELETE_PLAN_SUCCESS,
  //   ADMIN_PLAN_DETAILS_FAIL,
  //   ADMIN_PLAN_DETAILS_REQUEST,
  //   ADMIN_PLAN_DETAILS_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
} from "../constants/paymentConstants";

export const createPlanReducer = (state = { plan: {} }, action) => {
  switch (action.type) {
    case ADMIN_CREATE_PLAN_REQUEST:
      return { ...state, loading: true };
    case ADMIN_CREATE_PLAN_SUCCESS:
      return { loading: false, plan: action.payload };
    case ADMIN_CREATE_PLAN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const planListReducer = (state = { plans: [] }, action) => {
  switch (action.type) {
    case PLAN_LIST_REQUEST:
      return { loading: true };
    case PLAN_LIST_SUCCESS:
      return { loading: false, plans: action.payload };
    case PLAN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const planDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PLAN_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_PLAN_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_PLAN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
