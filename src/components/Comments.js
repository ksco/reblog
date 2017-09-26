import React from 'react';
import { Comment, Header } from 'semantic-ui-react';

import CommentComponent from './Comment';
import CommentForm from './CommentForm';
import Spinner from './Spinner';
import Empty from './Empty';

export default ({ comments, loading }) => {
  if (loading) { return <Spinner />; }
  return (
    <div>
      <Comment.Group>
        <br />
        <Header as='h3' dividing>评论区</Header>
        
        {
          comments.length === 0 
            ? <Empty /> 
            : comments.map(comment => (
              <CommentComponent key={comment.id} comment={comment} />
            ))
        }
        <CommentForm />
      </Comment.Group>
    </div>
  );
}
