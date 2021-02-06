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

export const createSubReducer = (state = { sub: {} }, action) => {
  switch (action.type) {
    case ADMIN_CREATE_SUB_REQUEST:
      return { ...state, loading: true };
    case ADMIN_CREATE_SUB_SUCCESS:
      return { loading: false, sub: action.payload };
    case ADMIN_CREATE_SUB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subListReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case SUB_LIST_REQUEST:
      return { loading: true };
    case SUB_LIST_SUCCESS:
      return { loading: false, subs: action.payload };
    case SUB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subEnableReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ENABLE_SUB_REQUEST:
      return { loading: true };
    case ADMIN_ENABLE_SUB_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_ENABLE_SUB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subDisableReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DISABLE_SUB_REQUEST:
      return { loading: true };
    case ADMIN_DISABLE_SUB_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DISABLE_SUB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const subDetailsReducer = (state = { sub: {} }, action) => {
    switch (action.type) {
      case SUB_DETAILS_REQUEST:
        return { ...state, loading: true };
      case SUB_DETAILS_SUCCESS:
        return { loading: false, sub: action.payload };
      case SUB_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };