import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import marked from 'marked';

import getPostDetail from '../actions/post';
import getPostComments from '../actions/comments';
import { post } from '../selectors';

import Spinner from './Spinner';
import Comments from './Comments';

class PostDetail extends Component {

  componentDidMount() {
    this.fetchPost(this.props);

    const { selectedPostId, fetchComments } = this.props;
    fetchComments(selectedPostId);
  }

  componentWillUpdate(nextProps) {
    this.fetchPost(nextProps);
  }

  fetchPost({ post, selectedPostId, fetchPost }) {
    if (!post || post.id !== selectedPostId) {
      fetchPost(selectedPostId);
    }
  }

  render() {
    const { post } = this.props;

    if (post) {
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
          
          <Comments comments={post.comments}/>
        </div>
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = (state) => {
  return {
    post: post(state),
    selectedPostId: parseInt(state.router.params.postId, 10),
  }
}

const mapStateToDispatch = (dispatch) => ({
  fetchPost: (selectedPostId) => dispatch(getPostDetail(selectedPostId)),
  fetchComments: (selectedPostId) => dispatch(getPostComments(selectedPostId)),
})

export default connect(mapStateToProps, mapStateToDispatch)(PostDetail);