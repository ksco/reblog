import { Model, attr } from 'redux-orm';
import { 
  LIST_SUCCESS,
  COMMENTS_SUCCESS,
  POST_COMMENT_SUCCESS,
  POST_SUCCESS,
} from '../constants/action';

export default class User extends Model {
  static reducer(action, User) {
    const { type, payload } = action;
    switch (type) {
      case LIST_SUCCESS:
        payload.forEach(({ user }) => {
          User.upsert({
            id: user.id,
            login: user.login,
            avatarUrl: user.avatar_url,
          });
        });
        break;
      case COMMENTS_SUCCESS: {
          const { comments } = payload;
          comments.forEach(({ user }) => {
            User.upsert({
              id: user.id,
              login: user.login,
              avatarUrl: user.avatar_url,
            });
          });
        }
        break;
      case POST_COMMENT_SUCCESS: {
          const { comment: { user } } = payload;
          User.upsert({
            id: user.id,
            login: user.login,
            avatarUrl: user.avatar_url,
          });
        }
        break;
      case POST_SUCCESS: {
          const { user } = payload;
          User.upsert({
            id: user.id,
            login: user.login,
            avatarUrl: user.avatar_url,
          });
        }      
        break;
      default: break;
    }
  }

  static get fields() {
    return {
      id: attr(),
      login: attr(),
      avatarUrl: attr(),
    };
  }

  static get modelName() {
    return 'User';
  }
}