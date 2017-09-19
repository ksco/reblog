import React from 'react';
import { Container } from 'semantic-ui-react';
import { Fragment } from 'redux-little-router';

import Header from './Header';
import Footer from './Footer';
import PostList from './PostList';
import PostDetail from './PostDetail';

export default () => (
  <Container text style={{ marginTop: '3em' }}>
    <Header />
    <Fragment forRoute='/'>
      <div>
        <Fragment forRoute='/'><PostList /></Fragment>
        <Fragment forRoute='/posts/:postId'><PostDetail /></Fragment>
      </div>
    </Fragment>
    <Footer />
  </Container>
);