import React from 'react';

import erik from '../../../../assets/erik.jpg';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';

import './CommentItem.scss';

const CommentItem = () => {
  const onEditBtnClick = () => {
    console.log('edit btn is clicked');
  };

  const onDeleteBtnClick = () => {
    console.log('delete btn is clicked');
  };

  return (
    <li className="comment-item__container">
      <main className="comment-item__main--content">
        <div className="comment-item__user-img--holder">
          <img
            className="comment-item__user-img"
            src={erik}
            alt="user-avatar"
          />
        </div>

        <div className="comment-item__content">
          <div className="comment-item__user-comment--holder">
            <div className="comment-item__user-date--holder">
              <p className="comment-item__user-name">John Doe</p>
              <p className="comment-item__comment-date">
                July 25, 2022 at 09:40 am
              </p>
            </div>
            <p className="comment-item__comment">Awesome post!!!</p>
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
