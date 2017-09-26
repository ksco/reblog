import { MORE_SUCCESS } from '../constants/action';
import { POSTS_PER_PAGE } from '../constants/config';

export default (state = {
  page: 1,
  more: true,
}, action) => {
  switch (action.type) {
    case MORE_SUCCESS:
      return {
        ...state,
        page: state.page + 1,
        more: action.payload.length === POSTS_PER_PAGE,
      };
    default: return state;
  }
}