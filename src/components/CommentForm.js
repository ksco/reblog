import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message, Icon, Divider } from 'semantic-ui-react';

import { AUTHORIZE_URL } from '../constants/api';
import {
  CLIENT_ID,
  SITE_URL,
} from '../constants/config';

import { params } from '../utils';
import comment from '../actions/comment';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const { postComment, selectedPostId, accessToken } = this.props;
    postComment(selectedPostId, this.state.value, accessToken);
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    const { loginedIn, commentLoading } = this.props;
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
          onSubmit={this.handleSubmit}
        >
          <Form.TextArea 
            placeholder='请在此输入评论...' 
            disabled={!loginedIn || commentLoading}
            onChange={this.handleChange}
            value={this.state.value}
          />
          <Button 
            content='提交评论' 
            labelPosition='left' 
            icon='edit' 
            primary 
            disabled={!loginedIn || commentLoading || this.state.value.length <= 0} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPostId: parseInt(state.router.params.postId, 10),  
  accessToken: state.state.auth.accessToken,
  loginedIn: state.state.auth.accessToken !== null,
  commentLoading: state.state.loading.comment,
});

const mapDispatchToProps = (dispatch) => ({
  postComment: (selectedPostId, body, accessToken) => dispatch(comment(selectedPostId, body, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);