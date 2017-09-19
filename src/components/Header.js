import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import { Link } from 'redux-little-router';

import { BLOG_NAME, BLOG_SLOGAN } from '../constants/config';

export default ({ backToHome }) => (
  <div>
    <Header 
      as='h1' 
      attached='top'
      style={{
        cursor: 'pointer',
      }}
    >
      <Link href='/'>{BLOG_NAME}</Link>
    </Header>
    <Segment attached>
      {BLOG_SLOGAN}
    </Segment>
  </div>
);