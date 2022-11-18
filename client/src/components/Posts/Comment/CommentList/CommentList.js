import React from 'react';
import './CommentList.scss';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = () => {
  return (
    <ul className="comment-list__container">
      <CommentItem />
    </ul>
  );
};

export default CommentList;
