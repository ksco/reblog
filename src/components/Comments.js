import React from 'react';
import { Divider, Comment, Header } from 'semantic-ui-react';

import CommentComponent from './Comment';

export default ({ comments }) => (
  <div>
    <Divider inverted section />
    <Comment.Group>
      <Header as='h3' dividing>评论区</Header>
      
      {comments.map(comment => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </Comment.Group>
  </div>
);