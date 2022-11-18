import React from 'react';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = () => {
  return (
    <main className="post-list__container">
      <PostItem />
    </main>
  );
};

export default PostList;
