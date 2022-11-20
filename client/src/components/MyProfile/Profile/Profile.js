import React from 'react';
import joseph from '../../../assets/joseph.jpg';

import './Profile.scss';

const Profile = () => {
  return (
    <div className="profile__container">
      <div className="profile__user-img--holder">
        <img className="profile__user--img" src={joseph} alt="Patrick" />
      </div>

      <div className="profile__user-info--holder">
        <p className="profile__user--name">John Doe</p>
        <p className="profile__user--email">patdav77@gmail.com</p>
      </div>
    </div>
  );
};

export default Profile;
