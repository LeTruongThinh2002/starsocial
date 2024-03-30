import axios from 'axios';
import toast from 'react-hot-toast';
import {API_URL_BASE, api} from '../../config/api';
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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

export const loginUserAction = (loginData: LoginType) => async (dispatch: any) => {
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
  } catch (error) {
    console.log('-------', error);
    dispatch({type: LOGIN_FAILURE, payload: error});
  }
};

export const registerUserAction = (registerData: RegisterType) => async (dispatch: any) => {
  dispatch({type: REGISTER_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL_BASE}/auth/signup`, registerData);
    if (data.token) {
      localStorage.setItem('jwt', data.token);
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.token
    });
    window.location.reload();
  } catch (error) {
    console.log('-------', error);
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
  } catch (error) {
    console.log('-------', error);
    dispatch({type: GET_PROFILE_FAILURE, payload: error});
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
    return data.user;
  } catch (error) {
    console.log('-------', error);
    showToast('updated failed', 'error');
    dispatch({type: UPDATED_PROFILE_FAILURE, payload: error});
  }
};

export const showToast = (message: string, type: 'success' | 'error' = 'error') => {
  if (type === 'success') {
    toast(message, {
      duration: 5000,
      className: 'bg-slate-800 text-green-400 font-bold',
      icon: (
        <img
          src='/wired-gradient-1865-shooting-stars.gif'
          className='w-[2.5rem] h-[2.5rem] object-cover object-center rounded-full'
          alt=''
        />
      )
    });
  } else {
    toast(message, {
      duration: 5000,
      className: 'bg-slate-800 text-red-500 font-bold',
      icon: <img src='/error.gif' className='w-[2.5rem] h-[2.5rem] object-cover object-center rounded-full' alt='' />
    });
  }
};
