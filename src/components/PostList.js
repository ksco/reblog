import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider, Button } from 'semantic-ui-react';
import { push } from 'redux-little-router';

import PostItem from './PostItem';
import Spinner from './Spinner';
import Empty from './Empty';

import getPostList from '../actions/posts';
import { posts } from '../selectors';

import { USERNAME } from '../constants/config';

class PostList extends Component {
  componentDidMount() {
    const { fetchList, accessToken } = this.props;
    fetchList(USERNAME, 'open', 1, accessToken);
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
    const { fetchList, loading, moreLoading, morePosts, currentPage, accessToken } = this.props;
    return (
      <div>
        <Divider horizontal>文章列表</Divider>
        {this.renderPostList()}
        { loading === false && morePosts ? (<div>
          <br />
          <Button
            fluid
            loading={moreLoading}
            onClick={() => fetchList(USERNAME, 'open', currentPage + 1, accessToken)}
          >
            加载更多
          </Button>
          </div>)
        : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: posts(state),
    loading: state.state.loading.list,
    moreLoading: state.state.loading.more,
    morePosts: state.state.paginate.more,
    currentPage: state.state.paginate.page,
    accessToken: state.state.auth.accessToken,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchList: (creator, state, page, accessToken) => dispatch(getPostList(creator, state, page, accessToken)),
  postClicked: (id) => dispatch(push(`/posts/${id}`)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList);