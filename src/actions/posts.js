import { CALL_API } from 'redux-api-middleware';

import { params } from '../utils';

import {
  LIST_LOADING,
  LIST_SUCCESS,
  MORE_LOADING,
  MORE_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/action';

import { POSTS_PER_PAGE } from '../constants/config';

import { ISSUES_BASE_URL } from '../constants/api';

export default (creator, state, page = 1, accessToken = null) => {
  let headers = {}
  if (accessToken !== null) {
    headers = { 'Authorization': `token ${accessToken}` }
  }

  let types = [ LIST_LOADING, LIST_SUCCESS, REQUEST_FAILURE ];
  if (page > 1) {
    types = [ MORE_LOADING, MORE_SUCCESS, REQUEST_FAILURE ];
  }
  return {
    [CALL_API]: {
      endpoint: ISSUES_BASE_URL + params({creator, state, page, per_page: POSTS_PER_PAGE}),
      headers,
      method: 'GET',
      types,
    }
  }
}