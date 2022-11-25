import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = () => {
  const postsData = useSelector((state) => state.post.postData);

  return (
    <ul className="post-list__container">
      {postsData.map((post) => {
        return (
          <PostItem
            key={post._id}
            id={post.id}
            img={post.image}
            pubDate={post.createdAt}
            title={post.title}
            descr={post.description}
            authorAv={post.author.photo}
            authorFirstName={post.author.firstName}
            authorLastName={post.author.lastName}
          />
        );
      })}
    </ul>
  );
};

export default PostList;
