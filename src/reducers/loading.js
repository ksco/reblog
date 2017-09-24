import {
  LIST_LOADING,
  LIST_SUCCESS,
  POST_LOADING,
  POST_SUCCESS,
  COMMENTS_LOADING,
  COMMENTS_SUCCESS,
  POST_COMMENT_LOADING,
  POST_COMMENT_SUCCESS,
  ACCESS_LOADING,
  ACCESS_SUCCESS,
} from '../constants/action';

export default (state = {
  list: false,
  post: false,
  comments: false,
  comment: false,
  accessToken: false,
}, action) => {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        list: true,
      };
    case LIST_SUCCESS:
      return {
        ...state,
        list: false,
      }
    case POST_LOADING:
      return {
        ...state,
        post: true,
      };
    case POST_SUCCESS: 
      return {
        ...state,
        post: false,
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        comments: true,
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        comments: false,
      };
    case POST_COMMENT_LOADING:
      return {
        ...state,
        comment: true,
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comment: false,
      };
    case ACCESS_LOADING:
      return {
        ...state,
        accessToken: true,
      };
    case ACCESS_SUCCESS:
      return {
        ...state,
        accessToken: false,
      };
    default: return state;
  }
}