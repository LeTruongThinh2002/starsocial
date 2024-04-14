import { API_URL_BASE, api } from "../../config/api";
import { showToast } from "../../ultis/showToast";
import {
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  CREATE_REEL_FAILURE,
  GET_USER_REEL_FAILURE,
  GET_USER_REEL_REQUEST,
  GET_USER_REEL_SUCCESS,
  GET_ALL_REEL_FAILURE,
  GET_ALL_REEL_REQUEST,
  GET_ALL_REEL_SUCCESS,
  DELETE_REEL_FAILURE,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  LIKE_REEL_FAILURE,
  LIKE_REEL_REQUEST,
  LIKE_REEL_SUCCESS,
} from "./reel.actionType";

export const createReel = (reqReel: any) => async (dispatch: any) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    const { data } = await api.post(`${API_URL_BASE}/api/reels`, reqReel);
    dispatch({
      type: CREATE_REEL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: CREATE_REEL_FAILURE, payload: error });
  }
};

export const getUserReel = (userId: any) => async (dispatch: any) => {
  dispatch({ type: GET_USER_REEL_REQUEST });
  try {
    const { data } = await api.get(`${API_URL_BASE}/reels/user/${userId}`);
    dispatch({
      type: GET_USER_REEL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: GET_USER_REEL_FAILURE, payload: error });
  }
};

export const getAllReel = () => async (dispatch: any) => {
  dispatch({ type: GET_ALL_REEL_REQUEST });
  try {
    const { data } = await api.get(`${API_URL_BASE}/reels`);
    dispatch({
      type: GET_ALL_REEL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: GET_ALL_REEL_FAILURE, payload: error });
  }
};

export const deleteReel = (reelId: any) => async (dispatch: any) => {
  dispatch({ type: DELETE_REEL_REQUEST });
  try {
    const { data } = await api.delete(`${API_URL_BASE}/api/reels/${reelId}`);
    dispatch({
      type: DELETE_REEL_SUCCESS,
      payload: reelId,
    });
    showToast(data, "success");
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: DELETE_REEL_FAILURE, payload: error });
  }
};

export const likeReel = (reelId: any) => async (dispatch: any) => {
  dispatch({ type: LIKE_REEL_REQUEST });
  try {
    const { data } = await api.post(`${API_URL_BASE}/api/reels/${reelId}/like`);
    dispatch({
      type: LIKE_REEL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: LIKE_REEL_FAILURE, payload: error });
  }
};
