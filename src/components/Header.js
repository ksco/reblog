import React from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import { replace } from 'redux-little-router';

import { BLOG_NAME, BLOG_SLOGAN } from '../constants/config';

const HeaderComponent = ({ backToHome }) => (
  <div>
    <Header 
      as='h1' 
      attached='top'
      onClick={backToHome}
      style={{
        cursor: 'pointer',
      }}
    >
      {BLOG_NAME}
    </Header>
    <Segment attached>
      {BLOG_SLOGAN}
    </Segment>
  </div>
);

const mapStateToDispatch = (dispatch) => ({
  backToHome: () => dispatch(replace('/')),
})

export default connect(null, mapStateToDispatch)(HeaderComponent);