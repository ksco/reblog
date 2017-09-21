import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Modal, Button, Icon } from 'semantic-ui-react';
import { Fragment } from 'redux-little-router';

import Header from './Header';
import Footer from './Footer';
import PostList from './PostList';
import PostDetail from './PostDetail';

import { queries } from '../utils';

import { SET_AUTH_CODE } from '../constants/action';

import access from '../actions/access';

class App extends Component {
  componentDidMount() {
    const { setAuthCode } = this.props;
    const queryObj = queries(window.location.search);
    if (queryObj.code !== undefined) {
      setAuthCode(queryObj.code, queryObj.state);
      window.history.pushState({}, document.title, '/');
    }
  }

  renderLoginConfirmModal() {
    const { authed, code, setAuthCode, getAccessToken, accessTokenLoading } = this.props;
    return (
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
  }

  render() {
    return (
      <Container text style={{ marginTop: '3em' }}>
        {this.renderLoginConfirmModal()}
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
  }
}

const mapStateToProps = (state) => ({
  authed: state.state.auth.code !== null,
  code: state.state.auth.code,
  accessTokenLoading: state.state.loading.accessToken,
});

const mapStateToDispatch = (dispatch) => ({
  setAuthCode: (code, rstr) => dispatch({
    type: SET_AUTH_CODE,
    payload: { code, rstr },
  }),
  getAccessToken: (code) => dispatch(access(code)),
});

export default connect(mapStateToProps, mapStateToDispatch)(App);