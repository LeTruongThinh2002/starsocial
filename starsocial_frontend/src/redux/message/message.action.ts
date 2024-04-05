import {API_URL_BASE, api} from '../../config/api';
import {showToast} from '../../ultis/showToast';
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS
} from './message.actionType';

export const createMessage =
  (message: any, chatId: any) => async (dispatch: any) => {
    dispatch({type: CREATE_MESSAGE_REQUEST});
    try {
      const {data} = await api.post(
        `${API_URL_BASE}/api/message/chats/${chatId}`,
        message
      );
      dispatch({
        type: CREATE_MESSAGE_SUCCESS,
        payload: data
      });
    } catch (error: any) {
      console.log('-------', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: CREATE_MESSAGE_FAILURE, payload: error});
    }
  };

export const createChat = (chat: any) => async (dispatch: any) => {
  dispatch({type: CREATE_CHAT_REQUEST});
  try {
    const {data} = await api.post(`${API_URL_BASE}/api/chats`, chat);
    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: CREATE_CHAT_FAILURE, payload: error});
  }
};

export const getAllChat = () => async (dispatch: any) => {
  dispatch({type: GET_ALL_CHAT_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/chats`);
    dispatch({
      type: GET_ALL_CHAT_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('-------', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: GET_ALL_CHAT_FAILURE, payload: error});
  }
};
