import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

import orm from '../orm';

export const ormSelector = state => state.orm;

export const posts = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => {
    return session.Post.all().toModelArray().map(post => {
      return {
        ...post.ref,
        ...post.labels.toRefArray(),
        user: post.user.ref,
      };
    })
  })
);

export const post = createSelector(
  ormSelector,
  state => state.router.params.postId,
  ormCreateSelector(orm, (session, selectedPostId) => {    
    if (session.Post.hasId(selectedPostId)) {
      const post = session.Post.withId(selectedPostId);
      const obj = Object.assign({}, post.ref);
      const commentModels = post.comments.toModelArray();
      
      obj.comments = commentModels.map(commentModel => {
        const user = commentModel.user.ref;
        return {
          ...commentModel.ref,
          user
        };
      });

      return obj;
    }
    return null;
  })
)