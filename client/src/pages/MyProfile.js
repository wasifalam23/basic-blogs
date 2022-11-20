import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Profile from '../components/MyProfile/Profile/Profile';
import Button from '../utils/Button/Button';
import Container from '../utils/Container/Container';
import './Pages.scss';

const MyProfile = () => {
  const editProfileBtn = (
    <Button icon={faPencil} className="my-profile__edit--btn">
      Edit Profile
    </Button>
  );

  return (
    <Container title="My Profile" button={editProfileBtn}>
      <Profile />
    </Container>
  );
};

export default MyProfile;
