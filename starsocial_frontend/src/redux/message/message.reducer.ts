import {ActionType} from '../auth/auth.reducer';
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  DELETE_CHAT_FAILURE,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  DELETE_MESSAGE_FAILURE,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS
} from './message.actionType';

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null
};

const messageReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
    case CREATE_MESSAGE_REQUEST:
    case GET_ALL_CHAT_REQUEST:
    case DELETE_CHAT_REQUEST:
    case DELETE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: false,
        error: null
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        loading: false,
        error: null
      };
    case GET_ALL_CHAT_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loading: false,
        error: null
      };
    case DELETE_CHAT_SUCCESS:
      return {
        ...state,
        chats: state.chats.filter((chat: any) => chat.id !== action.payload),
        message: null,
        loading: false,
        error: null
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        chats: state.chats.map((chat: any) => {
          chat.messages.filter((message: any) => message.id !== action.payload);
        }),
        message: null,
        loading: false,
        error: null
      };

    case CREATE_CHAT_FAILURE:
    case CREATE_MESSAGE_FAILURE:
    case GET_ALL_CHAT_FAILURE:
    case DELETE_CHAT_FAILURE:
    case DELETE_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default messageReducer;
