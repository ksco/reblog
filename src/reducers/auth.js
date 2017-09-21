import {
  SET_AUTH_CODE,
  ACCESS_SUCCESS,
} from '../constants/action';

export default (state = {
  code: null,
  accessToken: null,
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH_CODE:
      return {
        ...state,
        code: payload.code,
      }
    case ACCESS_SUCCESS:
      return {
        ...state,
        code: null,
        accessToken: payload.success ? payload.body.access_token : null,
      }
    default: return state;
  }
}