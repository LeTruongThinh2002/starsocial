import { ActionType } from "../auth/auth.reducer";
import {
  GET_ALL_STORY_REQUEST,
  CREATE_STORY_REQUEST,
  LIKE_STORY_REQUEST,
  GET_USER_STORY_REQUEST,
  DELETE_STORY_REQUEST,
  GET_ALL_STORY_SUCCESS,
  CREATE_STORY_SUCCESS,
  LIKE_STORY_SUCCESS,
  GET_USER_STORY_SUCCESS,
  DELETE_STORY_SUCCESS,
  GET_USER_STORY_FAILURE,
  GET_ALL_STORY_FAILURE,
  CREATE_STORY_FAILURE,
  LIKE_STORY_FAILURE,
  DELETE_STORY_FAILURE,
  EDIT_STORY_SUCCESS,
  EDIT_STORY_REQUEST,
  EDIT_STORY_FAILURE,
} from "./story.actionType";

const initialState = {
  stories: [],
  userStory: [],
  loading: false,
  error: null,
};

const storyReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_STORY_REQUEST:
    case CREATE_STORY_REQUEST:
    case LIKE_STORY_REQUEST:
    case GET_USER_STORY_REQUEST:
    case DELETE_STORY_REQUEST:
    case EDIT_STORY_REQUEST:
      return { ...state, loading: false, error: null };
    case GET_ALL_STORY_SUCCESS:
      return {
        ...state,
        stories: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        stories: [...state.stories, action.payload],
        loading: false,
        error: null,
      };
    case LIKE_STORY_SUCCESS:
    case EDIT_STORY_SUCCESS:
      return {
        ...state,
        stories: state.stories.map((story: any) => {
          story.id === action.payload.id ? action.payload : story;
        }),
        loading: false,
        error: null,
      };
    case GET_USER_STORY_SUCCESS:
      return {
        ...state,
        userStory: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        stories: state.stories.filter(
          (story: any) => story.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case GET_USER_STORY_FAILURE:
      return {
        ...state,
        userStory: null,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_STORY_FAILURE:
    case CREATE_STORY_FAILURE:
    case LIKE_STORY_FAILURE:
    case EDIT_STORY_FAILURE:
    case DELETE_STORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default storyReducer;
