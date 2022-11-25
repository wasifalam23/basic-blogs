import React, { useState, useEffect } from 'react';
import useHttp from '../../../hooks/http-hook';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CommentList from '../Comment/CommentList/CommentList';

import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import './PostInfo.scss';

const PostInfo = () => {
  const [post, setPost] = useState(null);
  const { sendRequest: getPost } = useHttp();

  const { id: postId } = useParams();

  useEffect(() => {
    const receivedData = (data) => {
      setPost(data.data.blog);
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/blogs/${postId}`,
    };
    getPost(reqConfig, receivedData);
  }, [getPost, postId]);

  const pubDate = moment(post?.createdAt).format('Do MMM YYYY');

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
            <h3 className="post-info__comment--title">Comments (3)</h3>
            <CommentList />

            <div className="post-info__comment--input-box">
              <Input field="textarea" placeholder="Write your comment here" />
              <Button type="button" className="post-info__comment--submit-btn">
                Submit
              </Button>
            </div>
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export default PostInfo;
