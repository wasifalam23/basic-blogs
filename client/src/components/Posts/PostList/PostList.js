import React from 'react';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = () => {
  return (
    <div className="post-list__container">
      <PostItem />
    </div>
  );
};

export default PostList;
