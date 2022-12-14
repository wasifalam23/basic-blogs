import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { authActions } from '../../../store/auth-slice';

import UserCard from './UserCard/UserCard';
import ConfirmModal from '../../../utils/Modal/ConfirmModal/ConfirmModal';
import defaultUserJpg from '../../../assets/default.jpg';

import './NavUser.scss';
import useHttp from '../../../hooks/http-hook';
import { toast } from 'react-toastify';

const NavUser = () => {
  const { sendRequest: logout } = useHttp();

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
    const logoutStatus = (data) => {
      if (data.status === 'success') {
        toast.success('You have successfully logged out');
        navigate('/auth');
        dispatch(authActions.setIsLoggedIn(false));
      } else {
        toast.error('Something went wrong!');
      }
    };

    logout(
      {
        url: 'http://localhost:3000/api/v1/users/logout',
      },
      logoutStatus
    );

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
          src={
            userPhoto
              ? `http://localhost:3000/users/${userPhoto}`
              : defaultUserJpg
          }
          alt="user-avatar"
        />
      </div>
    </React.Fragment>
  );
};

export default NavUser;
