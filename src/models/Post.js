import { Model, attr, fk, many } from 'redux-orm';
import { 
  LIST_SUCCESS,
  MORE_SUCCESS,
  POST_SUCCESS,
 } from '../constants/action';
 
 import { USERNAME } from '../constants/config';

export default class Post extends Model {
  static reducer(action, Post) {
    const { type, payload } = action;
    switch (type) {
      case LIST_SUCCESS:
      case MORE_SUCCESS:
        payload.forEach(post => {
          this.doUpsert(post, Post);
        });
        break;
      case POST_SUCCESS:
        this.doUpsert(payload, Post);
        break;
      default: break;
    }
  }

  static doUpsert(post, Post) {
    const labelIds = post.labels.map(label => label.id);
    const { id: userId, login: userLogin } = post.user;

    if (userLogin !== USERNAME || post.state !== 'open') { return; }

    Post.upsert({
      id: post.number,
      title: post.title,
      body: post.body,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      commentNumber: post.comments,
      labels: labelIds,
      user: userId,
    });
  }

  static get fields() {
    return {
      id: attr(),
      title: attr(),
      body: attr(),
      createdAt: attr(),
      updatedAt: attr(),
      commentNumber: attr(),
      labels: many('Label', 'posts'),
      user: fk('User', 'posts'),
    };
  }

  static get modelName() {
    return 'Post';
  }
}