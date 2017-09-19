import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

export default () => (
  <div>
    <Message icon style={{marginTop: '1em'}}>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>稍安勿躁</Message.Header>
        正在努力加载资源....
      </Message.Content>
    </Message>
  </div>
);