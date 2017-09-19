import { Model, attr, fk } from 'redux-orm';

import { COMMENTS_SUCCESS } from '../constants/action';

export default class Comment extends Model {
  static reducer(action, Comment) {
    const { type, payload } = action;
    switch (type) {
      case COMMENTS_SUCCESS:
        const { comments, postId } = payload;
        comments.forEach(comment => {
          const userId = comment.user.id;
          Comment.upsert({
            id: comment.id,
            body: comment.body,
            createdAt: comment.created_at,
            updatedAt: comment.updated_at,
            user: userId,
            post: postId,
          })
        });
        break;
      default: break;
    }
  }

  static get fields() {
    return {
      id: attr(),
      body: attr(),
      createdAt: attr(),
      updatedAt: attr(),
      user: fk('User', 'comments'),
      post: fk('Post', 'comments'),
    }
  }

  static get modelName() {
    return 'Comment';
  }
}