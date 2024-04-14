import { ActionType } from "../auth/auth.reducer";
import {
  GET_ALL_REEL_REQUEST,
  CREATE_REEL_REQUEST,
  LIKE_REEL_REQUEST,
  GET_USER_REEL_REQUEST,
  DELETE_REEL_REQUEST,
  GET_ALL_REEL_SUCCESS,
  CREATE_REEL_SUCCESS,
  LIKE_REEL_SUCCESS,
  DELETE_REEL_SUCCESS,
  GET_USER_REEL_SUCCESS,
  GET_ALL_REEL_FAILURE,
  CREATE_REEL_FAILURE,
  DELETE_REEL_FAILURE,
  GET_USER_REEL_FAILURE,
  LIKE_REEL_FAILURE,
} from "./reel.actionType";

const initialState = {
  reels: [],
  userReel: [],
  loading: false,
  error: null,
};

const reelReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_REEL_REQUEST:
    case CREATE_REEL_REQUEST:
    case LIKE_REEL_REQUEST:
    case GET_USER_REEL_REQUEST:
    case DELETE_REEL_REQUEST:
      return { ...state, loading: false, error: null };
    case GET_ALL_REEL_SUCCESS:
      return {
        ...state,
        reels: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        reels: [...state.reels, action.payload],
        loading: false,
        error: null,
      };
    case LIKE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.map((reel: any) => {
          reel.id === action.payload.id ? action.payload : reel;
        }),
        loading: false,
        error: null,
      };
    case GET_USER_REEL_SUCCESS:
      return {
        ...state,
        userReel: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.filter((reel: any) => reel.id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_USER_REEL_FAILURE:
      return {
        ...state,
        userReel: null,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_REEL_FAILURE:
    case CREATE_REEL_FAILURE:
    case LIKE_REEL_FAILURE:
    case DELETE_REEL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reelReducer;
