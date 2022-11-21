import React from 'react';
import EditProfileForm from '../components/EditProfile/EditProfileForm/EditProfileForm';
import Container from '../utils/Container/Container';

import './Pages.scss';

const EditMyProfile = () => {
  return (
    <Container title="Edit Profile">
      <EditProfileForm />
    </Container>
  );
};

export default EditMyProfile;
