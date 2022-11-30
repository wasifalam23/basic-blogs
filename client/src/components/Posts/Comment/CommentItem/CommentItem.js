import React from 'react';
import moment from 'moment';

import DropdownMenu from '../../DropdownMenu/DropdownMenu';

import './CommentItem.scss';

const CommentItem = (props) => {
  const onEditBtnClick = () => {
    console.log('edit btn is clicked');
  };

  const onDeleteBtnClick = () => {
    console.log('delete btn is clicked');
  };

  const creationDate = moment(props.createdAt).format('MMM  Do YYYY, hh:mm a');

  return (
    <li className="comment-item__container">
      <main className="comment-item__main--content">
        <div className="comment-item__user-img--holder">
          <img
            className="comment-item__user-img"
            src={`http://localhost:3000/users/${props.userImg}`}
            alt="user-avatar"
          />
        </div>

        <div className="comment-item__content">
          <div className="comment-item__user-comment--holder">
            <div className="comment-item__user-date--holder">
              <p className="comment-item__user-name">
                {props.firstName} {props.lastName}
              </p>
              <p className="comment-item__comment-date">
                {/* July 25, 2022 at 09:40 am */}
                {creationDate}
              </p>
            </div>
            <p className="comment-item__comment">{props.comment}</p>
          </div>
        </div>

        <DropdownMenu
          className="comment-item__dropdown"
          editBtnHandler={onEditBtnClick}
          deleteBtnHandler={onDeleteBtnClick}
        />
      </main>
    </li>
  );
};

export default CommentItem;
