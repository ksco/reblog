import React from 'react';
import { Button, Form, Message, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Divider inverted section />
    <Message warning>
      <Icon name='help' />
      您需要<Link href='/'>绑定 GitHub 账号</Link>后才能继续。
    </Message>
    <Form reply loading>
      <Form.TextArea placeholder='请在此输入评论...' />
      <Button content='提交评论' labelPosition='left' icon='edit' primary />
    </Form>
  </div>
);