import {API_URL_BASE, api} from '../../config/api';
import {showToast} from '../../ultis/showToast';
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

type PostTypes = {
  caption: string;
  image: string[] | null;
  video: string[] | null;
};

export const createPostAction =
  (postData: PostTypes) => async (dispatch: any) => {
    dispatch({type: CREATE_POST_REQUEST});
    try {
      const {data} = await api.post(`${API_URL_BASE}/api/posts`, postData);
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data
      });
      showToast('created post successfully!', 'success');
    } catch (error: any) {
      console.log('error ----', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: CREATE_POST_FAILURE, payload: error});
    }
  };

export const createCommentAction =
  (content: string, postId: any) => async (dispatch: any) => {
    dispatch({type: CREATE_COMMENT_REQUEST});
    try {
      const {data} = await api.post(
        `${API_URL_BASE}/api/comments/post/${postId}`,
        {
          content
        }
      );
      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: data
      });
    } catch (error: any) {
      console.log('error ----', error);
      showToast(error.response.data.message, 'error');
      dispatch({type: CREATE_COMMENT_FAILURE, payload: error});
    }
  };

export const getAllPostAction = () => async (dispatch: any) => {
  dispatch({type: GET_ALL_POST_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/posts`);
    dispatch({
      type: GET_ALL_POST_SUCCESS,
      payload: data
    });
    // console.log(data);
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: GET_ALL_POST_FAILURE, payload: error});
  }
};

export const getUserPostAction = (userId: any) => async (dispatch: any) => {
  dispatch({type: GET_USER_POST_REQUEST});
  try {
    const {data} = await api.get(`${API_URL_BASE}/api/posts/user/${userId}`);
    dispatch({
      type: GET_USER_POST_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: GET_USER_POST_FAILURE, payload: error});
  }
};

export const likePostAction = (postId: any) => async (dispatch: any) => {
  dispatch({type: LIKE_POST_REQUEST});
  try {
    const {data} = await api.put(`${API_URL_BASE}/api/posts/like/${postId}`);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: LIKE_POST_FAILURE, payload: error});
  }
};

export const likeCommentAction = (commentId: any) => async (dispatch: any) => {
  dispatch({type: LIKE_COMMENT_REQUEST});
  try {
    const {data} = await api.put(
      `${API_URL_BASE}/api/comments/like/${commentId}`
    );
    dispatch({
      type: LIKE_COMMENT_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: LIKE_COMMENT_FAILURE, payload: error});
  }
};

export const editPostAction = (post: any) => async (dispatch: any) => {
  dispatch({type: EDIT_POST_REQUEST});
  try {
    const {data} = await api.post(`${API_URL_BASE}/api/posts/edit`, post);
    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: data
    });
    showToast('Edit post completed!', 'success');
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: EDIT_POST_FAILURE, payload: error});
  }
};

export const deletePostAction = (postId: any) => async (dispatch: any) => {
  dispatch({type: DELETE_POST_REQUEST});
  try {
    const {data} = await api.delete(`${API_URL_BASE}/api/posts/${postId}`);
    showToast(data.message, 'success');
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId
    });
  } catch (error: any) {
    console.log('error ----', error);
    showToast(error.response.data.message, 'error');
    dispatch({type: DELETE_POST_FAILURE, payload: error});
  }
};
