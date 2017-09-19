import { CALL_API } from 'redux-api-middleware';

import {
  POST_LOADING,
  POST_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/action';

import { ISSUES_BASE_URL } from '../constants/api';

export default (selectedPostId) => {
  return {
    [CALL_API]: {
      endpoint: `${ISSUES_BASE_URL}/${selectedPostId}`,
      method: 'GET',
      types: [
        POST_LOADING,
        POST_SUCCESS,
        REQUEST_FAILURE,
      ],
    },
  };
};