import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentActions } from '../../../store/comment-slice';
import { postActions } from '../../../store/post-slice';
import useHttp from '../../../hooks/http-hook';
import useForm from '../../../hooks/form-hook';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CommentList from '../Comment/CommentList/CommentList';

import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import './PostInfo.scss';

const validateText = (value) => value.trim() !== '';

const PostInfo = () => {
  const [post, setPost] = useState(null);

  const commentChanged = useSelector((state) => state.comment.commentChanged);
  const commentEditId = useSelector((state) => state.comment.commentEditId);

  const dispatch = useDispatch();

  const { sendRequest: getPostById } = useHttp();
  const { sendRequest: createComment } = useHttp();
  const { sendRequest: getCommentById } = useHttp();
  const { sendRequest: updateComment } = useHttp();

  const {
    value: enteredComment,
    setEnteredValue: setComment,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    isValid: commentIsValid,
    hasError: commentHasError,
    reset: resetComment,
  } = useForm(validateText);

  const { id: postId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const receivedData = (data) => {
      if (data.status === 'success') {
        setPost(data.data.blog);
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/blogs/${postId}`,
    };
    getPostById(reqConfig, receivedData);
  }, [getPostById, postId, commentChanged]);

  useEffect(() => {
    if (!commentEditId) return;

    const commentData = (data) => {
      if (data.status === 'success') {
        setComment(data.data.comment.comment);
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/comments/${commentEditId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    getCommentById(reqConfig, commentData);
  }, [commentEditId, getCommentById, token, setComment, dispatch]);

  const pubDate = moment(post?.createdAt).format('Do MMM YYYY');

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    if (!commentIsValid) return;

    if (commentEditId) {
      const updatedCommentData = (data) => {
        if (data.status === 'success') {
          dispatch(commentActions.setCommentChanged());
          dispatch(commentActions.setCommentEditId(null));
          resetComment();
        } else {
          console.log(data);
        }
      };

      const reqConfig = {
        url: `http://localhost:3000/api/v1/comments/${commentEditId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: enteredComment,
        }),
      };

      updateComment(reqConfig, updatedCommentData);

      return;
    }

    const createdCommentData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(commentActions.setCommentChanged());
        resetComment();
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/blogs/${postId}/comments`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: enteredComment,
      }),
    };

    createComment(reqConfig, createdCommentData);
  };

  return (
    <React.Fragment>
      {post && (
        <main className="post-info__container">
          <header className="post-info__header">
            <div className="post-info__author--box">
              <img
                className="post-info__author--avatar"
                src={`http://localhost:3000/users/${post.author.photo}`}
                alt="author-avatar"
              />
              <p className="post-info__author--name">
                {post.author.firstName} {post.author.lastName}
              </p>
            </div>
            <p className="post-info__pub-date">{pubDate}</p>
          </header>

          <main className="post-info__content--main">
            <div className="post-info__post-img--holder">
              <img
                className="post-info__post-img"
                src={`http://localhost:3000/blogs/${post.image}`}
                alt="post"
              />
            </div>
            <h2 className="post-info__title">{post.title}</h2>
            <p className="post-info__descrp">{post.description}</p>
          </main>

          <section className="post-info__comment--section">
            <h3 className="post-info__comment--title">
              Comments ({post.comments.length})
            </h3>
            <CommentList comments={post.comments} />
            <div>
              <form
                onSubmit={commentSubmitHandler}
                className="post-info__comment--form-control"
              >
                <Input
                  field="textarea"
                  id="comment"
                  placeholder="Write your comment here"
                  type="text"
                  value={enteredComment}
                  onChange={commentChangeHandler}
                  onBlur={commentBlurHandler}
                  hasError={commentHasError}
                  errorMsg="Comment must not be empty"
                />
                <Button
                  type="submit"
                  className="post-info__comment--submit-btn"
                >
                  Submit
                </Button>
              </form>
            </div>
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export default PostInfo;
