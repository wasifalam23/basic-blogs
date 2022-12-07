import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../utils/Container/Container';
import PostList from '../components/Posts/PostList/PostList';
import Button from '../components/FormElements/Button/Button';

const MyPosts = () => {
  const { id: loggedInUserId } = useParams();

  const navigate = useNavigate();
  const addPostBtnClickHandler = () => {
    navigate('/addPost');
  };

  const addPostBtn = (
    <Button icon={faPlus} onClick={addPostBtnClickHandler}>
      Add New Post
    </Button>
  );

  return (
    <Container title="My Posts" button={addPostBtn}>
      <PostList myPosts loggedInUserId={loggedInUserId} />
    </Container>
  );
};

export default MyPosts;
