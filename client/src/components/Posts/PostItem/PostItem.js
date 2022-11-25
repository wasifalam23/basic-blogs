import React from 'react';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import joseph from '../../../assets/joseph.jpg';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import './PostItem.scss';

const PostItem = (props) => {
  const navigate = useNavigate();

  const readMoreHandler = () => {
    navigate('/postDetails');
  };

  const postPubDate = moment(props.pubDate).format('Do MMM YYYY');

  return (
    <li className="post-item__container">
      <header className="post-item__header">
        <img
          className="post-item__image"
          src={`http://localhost:3000/blogs/${props.img}`}
          alt="post"
        />
      </header>
      <main className="post-item__content--main">
        <p className="post-item__pub-date">Published on {postPubDate}</p>
        <DropdownMenu className="post-item__dropdown" />
        <h3 className="post-item__title" title={props.title}>
          {props.title}
        </h3>
        <p className="post-item__descrp">{props.descr}</p>
        <button
          type="button"
          className="post-item__read-more--btn"
          onClick={readMoreHandler}
        >
          Read More
        </button>

        <footer className="post-item__footer">
          <div className="post-item__author--box">
            <img
              className="post-item__author--avatar"
              src={`http://localhost:3000/users/${props.authorAv}`}
              alt="author-avatar"
            />
            <p className="post-item__author--name">
              {props.authorFirstName} {props.authorLastName}
            </p>
          </div>

          <div className="post-item__comment--box">
            <span className="post-item__comment--count">5</span>
            <p className="post-item__comment--text">Comments</p>
          </div>
        </footer>
      </main>
    </li>
  );
};

export default PostItem;
