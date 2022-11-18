import React from 'react';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = () => {
  return (
    <ul className="post-list__container">
      <PostItem />
    </ul>
  );
};

export default PostList;
