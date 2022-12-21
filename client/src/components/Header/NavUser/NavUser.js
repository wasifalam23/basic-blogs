import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

import UserCard from './UserCard/UserCard';
import ConfirmModal from '../../../utils/Modal/ConfirmModal/ConfirmModal';
import defaultUserJpg from '../../../assets/default.jpg';

import './NavUser.scss';

import useLogout from '../../../hooks/logout-hook';

const NavUser = () => {
  const { logout } = useLogout();

  const userPhoto = useSelector((state) => state.user.userData.photo);
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const cardOpenCloseHandler = () => {
    dispatch(uiActions.setUserCardState());
  };

  const cardCancelHander = () => {
    dispatch(uiActions.setUserCardClose());
  };

  const logoutModalConfirmHandler = () => {
    logout();
    dispatch(uiActions.setLogoutConfirmModalState(false));
  };

  const logoutModalCancelHandler = () => {
    dispatch(uiActions.setLogoutConfirmModalState(false));
  };

  return (
    <React.Fragment>
      {ui.userCardIsOpen && <UserCard onCancel={cardCancelHander} />}
      {ui.showLogoutConfrimModal && (
        <ConfirmModal
          title="Logout?"
          message="Do you really want to logout?"
          onConfirm={logoutModalConfirmHandler}
          onCancel={logoutModalCancelHandler}
        />
      )}
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
