import { CALL_API } from 'redux-api-middleware';

import { params } from '../utils';

import {
  LIST_LOADING,
  LIST_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/action';

import { ISSUES_BASE_URL } from '../constants/api';

export default (creator, state) => {
  return {
    [CALL_API]: {
      endpoint: ISSUES_BASE_URL + params({creator, state}),
      method: 'GET',
      types: [
        LIST_LOADING,
        LIST_SUCCESS,
        REQUEST_FAILURE,
      ],
    }
  }
}