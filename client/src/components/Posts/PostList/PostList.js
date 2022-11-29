import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';
import useHttp from '../../../hooks/http-hook';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = () => {
  const postsData = useSelector((state) => state.post.postData);

  const { sendRequest: deletePost } = useHttp();

  const dispatch = useDispatch();

  const deleteId = useSelector((state) => state.post.deletePostId);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!deleteId) return;

    const applyData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(postActions.setDeletePostId(null));
      }
    };

    deletePost(
      {
        url: `http://localhost:3000/api/v1/blogs/${deleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      applyData
    );
  }, [dispatch, deleteId, deletePost, token]);

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
            authorId={post.author._id}
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
