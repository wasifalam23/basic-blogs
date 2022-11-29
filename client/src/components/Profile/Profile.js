import React from 'react';
import { useSelector } from 'react-redux';

import joseph from '../../assets/joseph.jpg';

import './Profile.scss';

const Profile = () => {
  const currUser = useSelector((state) => state.user.userData);

  return (
    <div className="profile__container">
      <div className="profile__user-img--holder">
        <img
          className="profile__user--img"
          src={`http://localhost:3000/users/${currUser.photo}`}
          alt="Patrick"
        />
      </div>

      <div className="profile__user-info--holder">
        <p className="profile__user--name">
          {currUser.firstName} {currUser.lastName}
        </p>
        <p className="profile__user--email">{currUser.email}</p>
      </div>
    </div>
  );
};

export default Profile;
