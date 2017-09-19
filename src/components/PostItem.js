import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import timeago from 'timeago';
import marked from 'marked';

import PlainTextRenderer from '../libs/plaintext-renderer';

import { shorten } from '../utils';

const renderer = new PlainTextRenderer();

export default ({ id, title, body, updatedAt, commentNumber, onClick }) => (
  <Card 
    fluid 
    color='yellow'
    onClick={() => onClick(id)}
  >
    <Card.Content header={title} />
    <Card.Content description={shorten(marked(body, { renderer }), 160)} />
    <Card.Content extra>
      <Label>
        <Icon name='comment' /> {commentNumber}
      </Label>
      <Label>
        <Icon name='time' /> {timeago(null, 'zh_CN').format(updatedAt)}
      </Label>
    </Card.Content>
  </Card>
);

