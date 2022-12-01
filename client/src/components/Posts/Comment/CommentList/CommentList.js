import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentActions } from '../../../../store/comment-slice';
import { postActions } from '../../../../store/post-slice';
import './CommentList.scss';
import CommentItem from '../CommentItem/CommentItem';
import useHttp from '../../../../hooks/http-hook';

const CommentList = (props) => {
  const { sendRequest: deleteComment } = useHttp();

  const commentDeleteId = useSelector((state) => state.comment.commentDeleteId);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!commentDeleteId) return;

    const deletedCommentData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(commentActions.setCommentChanged());
        dispatch(commentActions.setCommentDeleteId(null));
      }
    };

    deleteComment(
      {
        url: `http://localhost:3000/api/v1/comments/${commentDeleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      deletedCommentData
    );
  }, [commentDeleteId, token, deleteComment, dispatch]);

  return (
    <ul className="comment-list__container">
      {props.comments.map((comment) => {
        return (
          <CommentItem
            key={comment._id}
            id={comment._id}
            commentCreatorId={comment.user._id}
            commentBlogAuthorId={comment.blog.author._id}
            userImg={comment.user.photo}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            comment={comment.comment}
            createdAt={comment.createdAt}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
