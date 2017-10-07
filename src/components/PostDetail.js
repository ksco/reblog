import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import marked from 'marked';

import getPostDetail from '../actions/post';
import getPostComments from '../actions/comments';
import { post } from '../selectors';

import Spinner from './Spinner';
import Empty from './Empty';
import Comments from './Comments';
import Labels from './Labels';

class PostDetail extends Component {

  componentDidMount() {
    this.fetchPost(this.props);
  }

  fetchPost({ post, selectedPostId, accessToken, fetchPost, fetchComments }) {
      if (!post) {
        fetchPost(selectedPostId, accessToken);
      }
      fetchComments(selectedPostId, accessToken);
  }

  render() {
    const { post, postLoading, commentsLoading } = this.props;

    if (post === null) {
      if (postLoading === true) {
        return <Spinner />;
      }
      return <Empty />;
    }
    return (
      <div>
        <Header 
          as='h2' 
          textAlign='center' 
          attached='top'
          style={{ marginTop: '1em' }}
        >
          {post.title}
        </Header>
        <Segment attached>
          <div className='marked' dangerouslySetInnerHTML={{__html: marked(post.body)}}></div>
        </Segment>
        
        <Labels labels={post.labels} />
        <Comments comments={post.comments} loading={commentsLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: post(state),
  selectedPostId: parseInt(state.router.params.postId, 10),
  postLoading: state.state.loading.post,
  commentsLoading: state.state.loading.comments,
  accessToken: state.state.auth.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (selectedPostId, accessToken) => dispatch(getPostDetail(selectedPostId, accessToken)),
  fetchComments: (selectedPostId, accessToken) => dispatch(getPostComments(selectedPostId, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);