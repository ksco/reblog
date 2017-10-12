import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

export default ({ code, authed, accessTokenLoading, setAuthCode, getAccessToken }) => (
  <Modal
    open={authed}
    closeOnEscape={false}
    closeOnRootNodeClick={false}
    size='small'
  >
    <Modal.Header>
      确认授权登录
    </Modal.Header>
    <Modal.Content>
      <p>您愿意授权登录到此博客，永不变心吗？</p>
    </Modal.Content>
    <Modal.Actions>
      <Button 
        negative
        disabled={accessTokenLoading}
        onClick={() => setAuthCode(null, null)}
      >
        再想想
      </Button>
      <Button
        positive
        disabled={accessTokenLoading}
        onClick={() => getAccessToken(code)}
      >
        <Icon
          name={accessTokenLoading ? 'circle notched' : 'checkmark'}
          loading={accessTokenLoading}
        />
        {"我愿意"}
      </Button>
    </Modal.Actions>
  </Modal>
);