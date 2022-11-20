import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import erik from '../../../../assets/erik.jpg';

import './CommentItem.scss';

const CommentItem = () => {
  const [actionMenuIsOpen, setActionMenuIsOpen] = useState(false);

  const actionMenuOpenHandler = () => {
    setActionMenuIsOpen((prev) => !prev);
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

        <button
          type="button"
          className="comment-item__action--btn"
          onClick={actionMenuOpenHandler}
        >
          <FontAwesomeIcon
            className="comment-item__action--icon"
            icon={faEllipsisH}
          />
        </button>

        {actionMenuIsOpen && (
          <div className="comment-item__action--dropdown-holder">
            <button className="comment-item__action--dropdown-btn">Edit</button>
            <button className="comment-item__action--dropdown-btn">
              Delete
            </button>
          </div>
        )}
      </main>
    </li>
  );
};

export default CommentItem;
