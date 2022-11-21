import React from 'react';
import Container from '../utils/Container/Container';
import AddPostForm from '../components/AddPost/AddPostForm/AddPostForm';

const AddPost = () => {
  return (
    <Container title="Add New Post">
      <AddPostForm />
    </Container>
  );
};

export default AddPost;
