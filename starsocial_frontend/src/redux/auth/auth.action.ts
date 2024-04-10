import axios from 'axios';

import {API_URL_BASE, api} from '../../config/api';
import {ResetPwd} from '../../pages/ResetPassword';
import {showToast} from '../../ultis/showToast';
import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_PROFILE_BY_ID_FAILURE,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USERS_SUGGEST_FAILURE,
  GET_USERS_SUGGEST_REQUEST,
  GET_USERS_SUGGEST_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SAVEDPOST_FAILURE,
  SAVEDPOST_REQUEST,
  SAVEDPOST_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATED_PROFILE_FAILURE,
  UPDATED_PROFILE_REQUEST,
  UPDATED_PROFILE_SUCCESS
} from './auth.actionType';

export type LoginType = {
  email: string;
  password: string;
};
export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  avatar: string;
};

export const loginUserAction =
  (loginData: LoginType) => async (dispatch: any) => {
    dispatch({type: LOGIN_REQUEST});
    try {
      const {data} = await axios.post(`${API_URL_BASE}/auth/signin`, loginData);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token
      });
      window.location.reload();
    } catch (error: any) {
      console.log('-------', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: LOGIN_FAILURE, payload: error});
    }
  };

export const forgotPasswordAction =
  (email: string) => async (dispatch: any) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
      const {data} = await axios.post(`${API_URL_BASE}/forgotPassword`, email);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data
      });
      showToast(data, 'success');
    } catch (error: any) {
      console.log('-------', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: FORGOT_PASSWORD_FAILURE, payload: error});
    }
  };

export const resetPasswordAction =
  (reqData: ResetPwd) => async (dispatch: any) => {
    dispatch({type: RESET_PASSWORD_REQUEST});
    try {
      const {data} = await axios.post(`${API_URL_BASE}/resetPassword`, reqData);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data
      });
      showToast(data, 'success');
    } catch (error: any) {
      console.log('-------', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: RESET_PASSWORD_FAILURE, payload: error});
    }
  };

export const registerUserAction =
  (registerData: RegisterType) => async (dispatch: any) => {
    dispatch({type: REGISTER_REQUEST});
    try {
      const {data} = await axios.post(
        `${API_URL_BASE}/auth/signup`,
        registerData
      );
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.token
      });
      window.location.reload();
    } catch (error: any) {
      console.log('-------', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: REGISTER_FAILURE, payload: error});
    }
  };

export const getProfileAction = () => async (dispatch: any) => {
  dispatch({type: GET_PROFILE_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/users/profile`);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    dispatch({type: GET_PROFILE_FAILURE, payload: error});
  }
};

export const getProfileByIdAction = (userId: any) => async (dispatch: any) => {
  dispatch({type: GET_PROFILE_BY_ID_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/users/${userId}`);
    dispatch({
      type: GET_PROFILE_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: GET_PROFILE_BY_ID_FAILURE, payload: error});
  }
};

export const updateProfileAction = (reqData: any) => async (dispatch: any) => {
  dispatch({type: UPDATED_PROFILE_REQUEST});
  try {
    const {data} = await api.put(`${API_URL_BASE}/api/users`, reqData);
    dispatch({
      type: UPDATED_PROFILE_SUCCESS,
      payload: data
    });
    showToast('updated successfully', 'success');
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: UPDATED_PROFILE_FAILURE, payload: error});
  }
};

export const searchUserAction = (query: string) => async (dispatch: any) => {
  dispatch({type: SEARCH_USER_REQUEST});
  try {
    const {data} = await api.get(
      `${API_URL_BASE}/api/users/search?query=${query}`
    );
    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: SEARCH_USER_FAILURE, payload: error});
  }
};

export const getUserSuggestAction = () => async (dispatch: any) => {
  dispatch({type: GET_USERS_SUGGEST_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/users/suggest`);
    dispatch({
      type: GET_USERS_SUGGEST_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: GET_USERS_SUGGEST_FAILURE, payload: error});
  }
};

export const followUserAction = (userId2: any) => async (dispatch: any) => {
  dispatch({type: FOLLOW_USER_REQUEST});
  try {
    const {data} = await api.put(`${API_URL_BASE}/api/users/follow/${userId2}`);
    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: FOLLOW_USER_FAILURE, payload: error});
  }
};

export const savedPostAction = (postId: any) => async (dispatch: any) => {
  dispatch({type: SAVEDPOST_REQUEST});
  try {
    const {post}: any = await api.put(
      `${API_URL_BASE}/api/posts/save/${postId}`
    );
    const {data} = await api.get(`${API_URL_BASE}/api/users/profile`);

    dispatch({
      type: SAVEDPOST_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: SAVEDPOST_FAILURE, payload: error});
  }
};
