import React from 'react';
import erik from '../../../../assets/erik.jpg';

import './CommentItem.scss';

const CommentItem = () => {
  return (
    <li className="comment-item__container">
      <div className="comment-item__main--content">
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
            <p className="comment-item__comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              dolores laborum amet saepe repellendus sint incidunt expedita
              sequi unde a.
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
