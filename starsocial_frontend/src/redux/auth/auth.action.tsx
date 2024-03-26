import axios from 'axios';
import {API_URL_BASE} from '../../config/api';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
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
};

export const loginUserAction =
  (loginData: LoginType) => async (dispatch: any) => {
    dispatch({type: LOGIN_REQUEST});
    try {
      const {data} = await axios.post(`${API_URL_BASE}/auth/signin`, loginData);
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
      }
      console.log('login successful', data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.jwt
      });
    } catch (error) {
      console.log('-------', error);
      dispatch({type: LOGIN_FAILURE, payload: error});
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
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
      }
      console.log('register successful', data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.jwt
      });
    } catch (error) {
      console.log('-------', error);
      dispatch({type: REGISTER_FAILURE, payload: error});
    }
  };
