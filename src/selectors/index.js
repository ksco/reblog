import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

import orm from '../orm';
import { toInteger } from '../utils';

export const ormSelector = state => state.orm;

export const posts = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => {
    return session.Post.all().toModelArray().map(post => ({
        ...post.ref,
        ...post.labels.toRefArray(),
        user: post.user.ref,
    })).sort((a, b) => a.id > b.id ? -1 : 1);
  })
);

export const post = createSelector(
  ormSelector,
  state => toInteger(state.router.params.postId),
  ormCreateSelector(orm, (session, selectedPostId) => {    
    if (session.Post.hasId(selectedPostId)) {
      const post = session.Post.withId(selectedPostId);
      const obj = Object.assign({}, post.ref);
      const labelModels = post.labels.toModelArray();
      const commentModels = post.comments.toModelArray();

      obj.comments = commentModels.map(commentModel => {
        const user = commentModel.user.ref;
        return {
          ...commentModel.ref,
          user
        };
      });

      obj.labels = labelModels.map(labelModel => {
        return {
          ...labelModel.ref,
        };
      });

      return obj;
    }
    return null;
  })
);