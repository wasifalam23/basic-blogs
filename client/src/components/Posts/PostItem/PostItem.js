import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { useNavigate } from 'react-router-dom';

import DropdownMenu from '../DropdownMenu/DropdownMenu';

import './PostItem.scss';
import { postActions } from '../../../store/post-slice';
import ConfirmModal from '../../../utils/Modal/ConfirmModal/ConfirmModal';

const PostItem = (props) => {
  const [dltConfirmModal, setDltConfirmModal] = useState(false);

  const currUserId = useSelector((state) => state.user.userData._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const readMoreHandler = () => {
    navigate(`/postDetails/${props.id}`);
  };

  const postPubDate = moment(props.pubDate).format('Do MMM YYYY');

  const dltPostHandler = () => {
    setDltConfirmModal(true);
  };

  const dltModalConfirmHandler = () => {
    dispatch(postActions.setDeletePostId(props.id));
  };

  const dltModalCancelHandler = () => {
    setDltConfirmModal(false);
  };

  const editPostHandler = () => {
    navigate(`/editPost/${props.id}`);
  };

  const dropDownBtns =
    props.authorId === currUserId && isLoggedIn ? (
      <DropdownMenu
        className="post-item__dropdown"
        onDelete={dltPostHandler}
        onEdit={editPostHandler}
      />
    ) : null;

  return (
    <li className="post-item__container">
      {dltConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          message="Do you really want to delete this post?"
          onConfirm={dltModalConfirmHandler}
          onCancel={dltModalCancelHandler}
        />
      )}
      <header className="post-item__header">
        <img
          className="post-item__image"
          src={`http://localhost:3000/blogs/${props.img}`}
          alt="post"
        />
      </header>
      <main className="post-item__content--main">
        <p className="post-item__pub-date">Published on {postPubDate}</p>
        {dropDownBtns}
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
            <span className="post-item__comment--count">
              {props.comments.length}
            </span>
            <p className="post-item__comment--text">Comments</p>
          </div>
        </footer>
      </main>
    </li>
  );
};

export default PostItem;
