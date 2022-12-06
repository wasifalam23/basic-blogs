import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import UserCard from './UserCard/UserCard';

import './NavUser.scss';

const NavUser = () => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const userPhoto = useSelector((state) => state.user.userData.photo);

  const cardOpenCloseHandler = () => {
    setCardIsOpen((prev) => !prev);
    console.log('clicked');
  };

  const cardCancelHander = () => {
    setCardIsOpen(false);
  };

  return (
    <React.Fragment>
      {cardIsOpen && <UserCard onCancel={cardCancelHander} />}
      <div
        className="logged-in-user__photo--holder"
        onClick={cardOpenCloseHandler}
      >
        <img
          className="logged-in-user__photo"
          src={`http://localhost:3000/users/${userPhoto}`}
          alt="user-avatar"
        />
      </div>
    </React.Fragment>
  );
};

export default NavUser;
