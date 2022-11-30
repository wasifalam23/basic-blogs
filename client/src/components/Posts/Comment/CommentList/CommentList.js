import React from 'react';
import './CommentList.scss';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = (props) => {
  return (
    <ul className="comment-list__container">
      {props.comments.map((comment) => {
        return (
          <CommentItem
            key={comment._id}
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
