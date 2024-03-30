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

interface Types {
  jwt: any;
  error: any;
  loading: boolean;
  user: any;
}

const initialState: Types = {
  jwt: null,
  error: null,
  loading: false,
  user: null
};

type ActionType = {
  type: string;
  payload: any;
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case UPDATED_PROFILE_REQUEST:
      return {...state, loading: true, error: null};
      break;
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {...state, jwt: action.payload, loading: false, error: null};
      break;
    case GET_PROFILE_SUCCESS:
    case UPDATED_PROFILE_SUCCESS:
      return {...state, user: action.payload, loading: false, error: null};
      break;
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
    case UPDATED_PROFILE_FAILURE:
      return {...state, loading: false, error: action.payload};
      break;
    default:
      return {...state, loading: false, error: action.payload};
      break;
  }
};
