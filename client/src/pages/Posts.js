import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../utils/Container/Container';
import PostList from '../components/Posts/PostList/PostList';
import Button from '../utils/Button/Button';

const Posts = () => {
  const addPostBtn = <Button icon={faPlus}>Add New Post</Button>;

  return (
    <Container title="All Posts" button={addPostBtn}>
      <PostList />
    </Container>
  );
};

export default Posts;
