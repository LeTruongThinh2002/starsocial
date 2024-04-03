import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS
} from './post.actionType';

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments: [],
  newComments: null
};

type ActionType = {
  type: string;
  payload: any;
};

export const postReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case GET_USER_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {...state, loading: false, error: null};
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        comments: action.payload.comments,
        error: null
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        error: null
      };
    case GET_ALL_POST_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        posts: action.payload,
        comments: action.payload.comments,
        error: null
      };

    case LIKE_POST_SUCCESS:
      if (!state.posts.length) return state; // Early return if no posts
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item): any =>
          item['id'] === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComments: action.payload,
        loading: false,
        error: null
      };
    case GET_ALL_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case GET_USER_POST_FAILURE:
    case CREATE_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
