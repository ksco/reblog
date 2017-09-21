import { CALL_API } from 'redux-api-middleware';

import {
  COMMENTS_LOADING,
  COMMENTS_SUCCESS,
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
      endpoint: `${ISSUES_BASE_URL}/${selectedPostId}/comments`,
      headers,
      method: 'GET',
      types: [
        COMMENTS_LOADING,
        {
          type: COMMENTS_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(json => ({
              postId: selectedPostId,
              comments: json,
            }));
          },
        },
        REQUEST_FAILURE,
      ],
    },
  };
};