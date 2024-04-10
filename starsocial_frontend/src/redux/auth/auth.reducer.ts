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

interface Types {
  jwt: any;
  error: any;
  loading: boolean;
  user: any;
  searchUser: any;
  userById: any;
  suggestUsers: any;
}

const initialState: Types = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  userById: null,
  suggestUsers: []
};

export type ActionType = {
  type: string;
  payload: any;
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_USERS_SUGGEST_REQUEST:
    case GET_PROFILE_BY_ID_REQUEST:
    case UPDATED_PROFILE_REQUEST:
    case SEARCH_USER_REQUEST:
    case FOLLOW_USER_REQUEST:
    case SAVEDPOST_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {...state, jwt: action.payload, loading: false, error: null};
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {...state, loading: false, error: null};
    case GET_PROFILE_SUCCESS:
    case UPDATED_PROFILE_SUCCESS:
    case FOLLOW_USER_SUCCESS:
    case SAVEDPOST_SUCCESS:
      return {...state, user: action.payload, loading: false, error: null};
    case GET_USERS_SUGGEST_SUCCESS:
      return {
        ...state,
        suggestUsers: action.payload,
        loading: false,
        error: null
      };
    case GET_PROFILE_BY_ID_SUCCESS:
      return {...state, userById: action.payload, loading: false, error: null};
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case FOLLOW_USER_FAILURE:
    case GET_PROFILE_FAILURE:
    case UPDATED_PROFILE_FAILURE:
    case SAVEDPOST_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case GET_USERS_SUGGEST_FAILURE:
      return {...state, loading: false, error: action.payload};
    case GET_PROFILE_BY_ID_FAILURE:
      return {...state, userById: null, loading: false, error: action.payload};
    case SEARCH_USER_FAILURE:
      return {...state, searchUser: [], loading: false, error: action.payload};
    default:
      return state;
  }
};
