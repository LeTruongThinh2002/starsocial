import { API_URL_BASE, api } from "../../config/api";
import { showToast } from "../../ultis/showToast";
import {
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAILURE,
  GET_USER_STORY_FAILURE,
  GET_USER_STORY_REQUEST,
  GET_USER_STORY_SUCCESS,
  GET_ALL_STORY_FAILURE,
  GET_ALL_STORY_REQUEST,
  GET_ALL_STORY_SUCCESS,
  EDIT_STORY_FAILURE,
  EDIT_STORY_REQUEST,
  EDIT_STORY_SUCCESS,
  DELETE_STORY_FAILURE,
  DELETE_STORY_REQUEST,
  DELETE_STORY_SUCCESS,
  LIKE_STORY_FAILURE,
  LIKE_STORY_REQUEST,
  LIKE_STORY_SUCCESS,
} from "./story.actionType";

export const createStory = (reqStory: any) => async (dispatch: any) => {
  dispatch({ type: CREATE_STORY_REQUEST });
  try {
    const { data } = await api.post(`${API_URL_BASE}/api/story`, reqStory);
    dispatch({
      type: CREATE_STORY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: CREATE_STORY_FAILURE, payload: error });
  }
};

export const getUserStory = (userId: any) => async (dispatch: any) => {
  dispatch({ type: GET_USER_STORY_REQUEST });
  try {
    const { data } = await api.get(`${API_URL_BASE}/story/user/${userId}`);
    dispatch({
      type: GET_USER_STORY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: GET_USER_STORY_FAILURE, payload: error });
  }
};

export const getAllStory = () => async (dispatch: any) => {
  dispatch({ type: GET_ALL_STORY_REQUEST });
  try {
    const { data } = await api.get(`${API_URL_BASE}/story`);
    dispatch({
      type: GET_ALL_STORY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: GET_ALL_STORY_FAILURE, payload: error });
  }
};

export const editStory = (reqStory: any) => async (dispatch: any) => {
  dispatch({ type: EDIT_STORY_REQUEST });
  try {
    const { data } = await api.put(`${API_URL_BASE}/api/story/edit`, reqStory);
    dispatch({
      type: EDIT_STORY_SUCCESS,
      payload: data,
    });
    showToast("edit successfully!", "success");
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: EDIT_STORY_FAILURE, payload: error });
  }
};

export const deleteStory = (storyId: any) => async (dispatch: any) => {
  dispatch({ type: DELETE_STORY_REQUEST });
  try {
    const { data } = await api.delete(`${API_URL_BASE}/api/story/${storyId}`);
    dispatch({
      type: DELETE_STORY_SUCCESS,
      payload: storyId,
    });
    showToast(data, "success");
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: DELETE_STORY_FAILURE, payload: error });
  }
};

export const likeStory = (storyId: any) => async (dispatch: any) => {
  dispatch({ type: LIKE_STORY_REQUEST });
  try {
    const { data } = await api.post(
      `${API_URL_BASE}/api/story/${storyId}/like`
    );
    dispatch({
      type: LIKE_STORY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("-------", error);
    showToast(error.response.data.message, "error");
    dispatch({ type: LIKE_STORY_FAILURE, payload: error });
  }
};
