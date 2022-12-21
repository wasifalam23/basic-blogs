import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

import UserCard from './UserCard/UserCard';

import defaultUserJpg from '../../../assets/default.jpg';

import './NavUser.scss';
import LogoutModal from '../LogoutModal/LogoutModal';

const NavUser = () => {
  const userPhoto = useSelector((state) => state.user.userData.photo);
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const cardOpenCloseHandler = () => {
    dispatch(uiActions.setUserCardState());
  };

  const cardCancelHander = () => {
    dispatch(uiActions.setUserCardClose());
  };

  return (
    <React.Fragment>
      {ui.userCardIsOpen && <UserCard onCancel={cardCancelHander} />}
      {ui.showLogoutConfrimModal && <LogoutModal />}
      <div
        className="logged-in-user__photo--holder"
        onClick={cardOpenCloseHandler}
      >
        <img
          className="logged-in-user__photo"
          src={
            userPhoto
              ? `http://192.168.0.106:3000/users/${userPhoto}`
              : defaultUserJpg
          }
          alt="user-avatar"
        />
      </div>
    </React.Fragment>
  );
};

export default NavUser;
