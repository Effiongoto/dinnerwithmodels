import {
  MODEL_LIST_REQUEST,
  MODEL_LIST_SUCCESS,
  MODEL_LIST_FAIL,
  MODEL_DETAILS_SUCCESS,
  MODEL_DETAILS_REQUEST,
  MODEL_DETAILS_FAIL,
  MODEL_LOGIN_REQUEST,
  MODEL_LOGIN_SUCCESS,
  MODEL_LOGIN_FAIL,
  MODEL_LOGOUT,
  MODEL_REGISTER_REQUEST,
  MODEL_REGISTER_SUCCESS,
  MODEL_REGISTER_FAIL,
} from '../constants/modelConstants';

import {
  MODEL_UPDATE_PROFILE_REQUEST,
  MODEL_UPDATE_PROFILE_SUCCESS,
  MODEL_UPDATE_PROFILE_FAIL,
  MODEL_UPDATE_PROFILE_RESET,
} from '../constants/modelProfileConstants';

export const modelListReducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case MODEL_LIST_REQUEST:
      return { loading: true, models: [] };
    case MODEL_LIST_SUCCESS:
      return { loading: false, models: action.payload };
    case MODEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const modelDetailsReducer = (
  state = { model: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MODEL_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MODEL_DETAILS_SUCCESS:
      return { loading: false, model: action.payload };
    case MODEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const modelLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case MODEL_LOGIN_REQUEST:
      return { loading: true };
    case MODEL_LOGIN_SUCCESS:
      return { loading: false, modelInfo: action.payload };
    case MODEL_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case MODEL_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const modelRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case MODEL_REGISTER_REQUEST:
      return { loading: true };
    case MODEL_REGISTER_SUCCESS:
      return { loading: false, modelInfo: action.payload };
    case MODEL_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const modelDetailsReducer = (state = { model: {} }, action) => {
//   switch (action.type) {
//     case MODEL_DETAILS_REQUEST:
//       return { ...state, loading: true };
//     case MODEL_DETAILS_SUCCESS:
//       return { loading: false, model: action.payload };
//     case MODEL_DETAILS_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const modelUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case MODEL_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case MODEL_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, modelInfo: action.payload };
    case MODEL_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case MODEL_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
