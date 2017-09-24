import { CALL_API } from 'redux-api-middleware';

import {
  POST_COMMENT_LOADING,
  POST_COMMENT_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/action';

import { ISSUES_BASE_URL } from '../constants/api';

export default (selectedPostId, body, accessToken) => {
  return {
    [CALL_API]: {
      endpoint: `${ISSUES_BASE_URL}/${selectedPostId}/comments`,
      headers: {
        'Authorization': `token ${accessToken}`,
      },
      method: 'POST',
      types: [
        POST_COMMENT_LOADING,
        {
          type: POST_COMMENT_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(json => ({
              postId: selectedPostId,
              comment: json,
            }));
          },
        },
        REQUEST_FAILURE,
      ],
      body: JSON.stringify({ body }),
    },
  };
};