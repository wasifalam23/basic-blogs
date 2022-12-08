import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { authActions } from '../../../store/auth-slice';

import UserCard from './UserCard/UserCard';
import ConfirmModal from '../../../utils/Modal/ConfirmModal/ConfirmModal';

import './NavUser.scss';

const NavUser = () => {
  const userPhoto = useSelector((state) => state.user.userData.photo);
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardOpenCloseHandler = () => {
    dispatch(uiActions.setUserCardState());
  };

  const cardCancelHander = () => {
    dispatch(uiActions.setUserCardClose());
  };

  const logoutModalConfirmHandler = () => {
    dispatch(authActions.logout());
    dispatch(uiActions.setLogoutConfirmModalState(false));
    navigate('/auth', { replace: true });
  };

  const logoutModalCancelHandler = () => {
    dispatch(uiActions.setLogoutConfirmModalState(false));
  };

  return (
    <React.Fragment>
      {ui.userCardIsOpen && <UserCard onCancel={cardCancelHander} />}
      {ui.showLogoutConfrimModal && (
        <ConfirmModal
          title="Are you sure?"
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
          src={`http://localhost:3000/users/${userPhoto}`}
          alt="user-avatar"
        />
      </div>
    </React.Fragment>
  );
};

export default NavUser;
