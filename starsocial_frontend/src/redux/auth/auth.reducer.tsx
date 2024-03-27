import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from './auth.actionType';

interface Types {
  jwt: any;
  error: any;
  loading: boolean;
}

const initialState: Types = {
  jwt: null,
  error: null,
  loading: false
};

type ActionType = {
  type: string;
  payload: any;
};

const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {...state, loading: true, error: null};
      break;
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {...state, jwt: action.payload, loading: false, error: null};
      break;
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload};
      break;
    default:
      return {...state, loading: false, error: action.payload};
      break;
  }
};

export default authReducer;
