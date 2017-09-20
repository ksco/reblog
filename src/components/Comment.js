import React from 'react';
import { Comment } from 'semantic-ui-react';
import timeago from 'timeago';
import marked from 'marked';

export default ({ comment }) => (
  <div>
    <br />
    <Comment>
      <Comment.Avatar src={comment.user.avatarUrl} />
      <Comment.Content>
        <Comment.Author as='a'>{comment.user.login}</Comment.Author>
        <Comment.Metadata>
          <div>{timeago(null, 'zh_CN').format(comment.updatedAt)}</div>
        </Comment.Metadata>
        <Comment.Text>
          <div className='marked' dangerouslySetInnerHTML={{__html: marked(comment.body)}}></div>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  </div>
);