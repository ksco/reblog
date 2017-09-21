import { CALL_API } from 'redux-api-middleware';

import {
  POST_LOADING,
  POST_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/action';

import { ISSUES_BASE_URL } from '../constants/api';

export default (selectedPostId, accessToken = null) => {
  let headers = {}
  if (accessToken !== null) {
    headers = { 'Authorization': `token ${accessToken}` }
  }
  return {
    [CALL_API]: {
      endpoint: `${ISSUES_BASE_URL}/${selectedPostId}`,
      headers,
      method: 'GET',
      types: [
        POST_LOADING,
        POST_SUCCESS,
        REQUEST_FAILURE,
      ],
    },
  };
};