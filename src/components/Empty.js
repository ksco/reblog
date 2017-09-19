import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

export default () => (
  <div>
    <Message icon style={{marginTop: '1em'}}>
      <Icon name='conversation' />
      <Message.Content>
        这里屁都没有。
      </Message.Content>
    </Message>
  </div>
);