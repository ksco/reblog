import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider } from 'semantic-ui-react';
import { push } from 'redux-little-router';

import PostItem from './PostItem';
import Spinner from './Spinner';
import Empty from './Empty';

import getPostList from '../actions/posts';
import { posts } from '../selectors';

class PostList extends Component {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList('ksco', 'open');
  }

  renderPostList() {
    const { posts, loading, postClicked } = this.props;
    if (loading === true) { return <Spinner />; }
    if (posts.length === 0) { return <Empty />; }
    if (posts.length > 0) {
      return (
        <Card.Group>
          { posts.map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                updatedAt={post.updatedAt}
                commentNumber={post.commentNumber}
                onClick={postClicked}
              />
            )) }
        </Card.Group>
      );
    }
  }

  render() {
    return (
      <div>
        <Divider horizontal>文章列表</Divider>
        {this.renderPostList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: posts(state),
    loading: state.state.loading.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchList: (creator, state) => dispatch(getPostList(creator, state)),
  postClicked: (id) => dispatch(push(`/posts/${id}`)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList);