import React from 'react';
import { Button, Form, Message, Icon, Divider } from 'semantic-ui-react';

import { AUTHORIZE_URL } from '../constants/api';
import {
  CLIENT_ID,
  SITE_URL,
} from '../constants/config';

import { params } from '../utils';

export default ({ loginedIn }) => {
  const auth_url = `${AUTHORIZE_URL}${params({
    client_id: CLIENT_ID,
    scope: 'public_repo',
    redirect_uri: SITE_URL,
  })}`;
  return (
    <div>
      <Divider inverted section />
      {
        loginedIn 
        ? null 
        : <Message warning>
            <Icon name='help' />
            您需要<a target='_blank' href={auth_url}>绑定 GitHub 账号</a>后才能继续。
          </Message>
      }
      <Form
        reply
        loading={!loginedIn}
      >
        <Form.TextArea placeholder='请在此输入评论...' />
        <Button content='提交评论' labelPosition='left' icon='edit' primary />
      </Form>
    </div>
  );
}