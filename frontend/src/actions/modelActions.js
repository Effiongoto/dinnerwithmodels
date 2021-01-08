import axios from 'axios';
import {
  MODEL_LIST_REQUEST,
  MODEL_LIST_SUCCESS,
  MODEL_LIST_FAIL,
  MODEL_DETAILS_REQUEST,
  MODEL_DETAILS_SUCCESS,
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
} from '../constants/modelProfileConstants';

export const listModels = () => async (dispatch) => {
  try {
    dispatch({ type: MODEL_LIST_REQUEST });

    const { data } = await axios.get('/api/models');

    dispatch({
      type: MODEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MODEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listModelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MODEL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/models/${id}`);

    dispatch({
      type: MODEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MODEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  //login with number or username or email
  try {
    dispatch({
      type: MODEL_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/models/login',
      { username, password },
      config
    );

    dispatch({
      type: MODEL_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('modelInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MODEL_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modelLogout = () => (dispatch) => {
  localStorage.removeItem('modelInfo');
  dispatch({ type: MODEL_LOGOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: MODEL_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/models',
      { username, email, password },
      config
    );

    dispatch({
      type: MODEL_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: MODEL_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('modelInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MODEL_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getModelDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MODEL_DETAILS_REQUEST,
    });

    const {
      modelLogin: { modelInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${modelInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/models/${id}`, config);

    dispatch({
      type: MODEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MODEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateModelProfile = (model) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MODEL_UPDATE_PROFILE_REQUEST,
    });

    const {
      modelLogin: { modelInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${modelInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/models/profile`, model, config);

    dispatch({
      type: MODEL_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: MODEL_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('modelInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MODEL_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
