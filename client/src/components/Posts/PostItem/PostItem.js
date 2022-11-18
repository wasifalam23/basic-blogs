import React from 'react';
import bk from '../../../assets/bk.jpg';
import joseph from '../../../assets/joseph.jpg';

import './PostItem.scss';

const PostItem = () => {
  return (
    <div className="post-item__container">
      <header className="post-item__header">
        <img className="post-item__image" src={bk} alt="post" />
      </header>
      <main className="post-item__content--main">
        <p className="post-item__pub-date">Published on 22 Jan 2021</p>
        <h3
          className="post-item__title"
          title="Learning to code from students for better"
        >
          Vision on sea on the day more of the
        </h3>
        <p className="post-item__descrp">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dolor,
          error aperiam in tempore ipsam reiciendis soluta sapiente sit
          quibusdam. error aperiam in tempore ipsam reiciendis soluta sapiente
          sit quibusdam. quibusdam. error aperiam in tempore ipsam reiciendis
          soluta sapiente sit quibusdam.
        </p>
        <button className="post-item__read-more--btn">Read More</button>

        <footer className="post-item__footer">
          <div className="post-item__author--box">
            <img
              className="post-item__author--avatar"
              src={joseph}
              alt="author-avatar"
            />
            <p className="post-item__author--name">Patrick Davies</p>
          </div>

          <div className="post-item__comment--box">
            <span className="post-item__comment--count">5</span>
            <p className="post-item__comment--text">Comments</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PostItem;
