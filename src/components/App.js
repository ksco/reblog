import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Fragment } from 'redux-little-router';

import Header from './Header';
import Footer from './Footer';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Empty from './Empty';
import LoginConfirmModal from './LoginConfirmModal';

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
      <LoginConfirmModal
        authed={authed}
        code={code}
        setAuthCode={setAuthCode}
        getAccessToken={getAccessToken}
        accessTokenLoading={accessTokenLoading}
      />
    );
  }

  render() {
    return (
      <Container text style={{ marginTop: '3em' }}>
        {this.renderLoginConfirmModal()}
        <Header />
        <Fragment forRoute='/'>
          <div>
            <Fragment forRoute='/posts'>
              <div>
                <Fragment forRoute='/:postId'>
                  <div>
                    <Fragment forRoute='/:whatever'><Empty /></Fragment>
                    <Fragment forRoute='/'><PostDetail /></Fragment>
                    <Fragment forNoMatch><Empty /></Fragment>
                  </div>
                </Fragment>
                <Fragment forRoute='/'><PostList /></Fragment>
                <Fragment forNoMatch><Empty /></Fragment>
              </div>
            </Fragment>
            <Fragment forRoute='/tags'>
              <div>
                <Fragment forRoute='/:tagName'>
                  <div>
                    <Fragment forRoute='/:whatever'><Empty /></Fragment>
                    <Fragment forRoute='/'><PostList /></Fragment>
                    <Fragment forNoMatch><Empty /></Fragment>
                  </div>
                </Fragment>
                <Fragment forRoute='/'><Empty /></Fragment>
                <Fragment forNoMatch><Empty /></Fragment>
              </div>
            </Fragment>
            <Fragment forRoute='/'><PostList /></Fragment>
            <Fragment forNoMatch><Empty /></Fragment>
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

const mapDispatchToProps = (dispatch) => ({
  setAuthCode: (code, rstr) => dispatch({
    type: SET_AUTH_CODE,
    payload: { code, rstr },
  }),
  getAccessToken: (code) => dispatch(access(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);