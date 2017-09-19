import {
  LIST_LOADING,
  LIST_SUCCESS,
  POST_LOADING,
  POST_SUCCESS,
  COMMENTS_LOADING,
  COMMENTS_SUCCESS,
} from '../constants/action';

export default (state = {
  list: false,
  post: false,
  comment: false,
}, action) => {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        list: true,
      }
    case LIST_SUCCESS:
      return {
        ...state,
        list: false,
      }
    case POST_LOADING:
      return {
        ...state,
        post: true,
      }
    case POST_SUCCESS: 
      return {
        ...state,
        post: false,
      }
    case COMMENTS_LOADING:
      return {
        ...state,
        comment: true,
      }
    case COMMENTS_SUCCESS:
      return {
        ...state,
        comment: false,
      }
    default: return state;
  }
}