import {ActionType} from '../auth/auth.reducer';
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  LIKE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
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

export const postReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case LIKE_COMMENT_REQUEST:
    case GET_USER_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case DELETE_POST_REQUEST:
    case EDIT_POST_REQUEST:
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
    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post: any) => {
          const commentIndex = post.comments.findIndex(
            (comment: any) => comment.id === action.payload.id
          );
          if (commentIndex !== -1) {
            const updatedComments = [...post.comments];
            updatedComments[commentIndex] = action.payload;
            return {...post, comments: updatedComments};
          }
          return post;
        })
      };
    case GET_ALL_POST_SUCCESS:
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
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post.id !== action.payload),
        loading: false,
        error: null
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post.id === action.payload.id ? action.payload : post
        ),
        loading: false,
        error: null
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post.id === action.payload.postId
            ? {...post, comments: [...post.comments, action.payload.comment]}
            : post
        ),
        loading: false,
        error: null
      };
    case GET_ALL_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case LIKE_COMMENT_FAILURE:
    case DELETE_POST_FAILURE:
    case EDIT_POST_FAILURE:
    case CREATE_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload};
    case GET_USER_POST_FAILURE:
      return {...state, post: null, loading: false, error: action.payload};
    default:
      return state;
  }
};
