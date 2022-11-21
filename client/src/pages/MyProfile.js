import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Profile from '../components/Profile/Profile';
import Button from '../components/utils/Button/Button';
import Container from '../utils/Container/Container';
import './Pages.scss';

const MyProfile = () => {
  const navigate = useNavigate();

  const editProfBtnClickHandler = () => {
    navigate('/editMyProfile');
  };

  const editProfileBtn = (
    <Button
      icon={faPencil}
      className="my-profile__edit--btn"
      onClick={editProfBtnClickHandler}
    >
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
