import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultUserJpg from '../../../assets/default.jpg';
import ConfirmModal from '../../../utils/Modal/ConfirmModal/ConfirmModal';
import useLogout from '../../../hooks/logout-hook';

import {
  faListAlt,
  faList,
  faFont,
  faUserEdit,
  faSignOutAlt,
  faChevronRight,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

import { NavLink } from 'react-router-dom';

import './SideDrawer.scss';

const SideDrawer = (props) => {
  const { logout } = useLogout();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.user.userData);

  const showLogoutConfrimModal = useSelector(
    (state) => state.ui.showLogoutConfrimModal
  );

  const dispatch = useDispatch();

  const logoutHandler = () => {
    props.onCancel();
    dispatch(uiActions.setLogoutConfirmModalState(true));
    dispatch(uiActions.setUserCardClose());
  };

  const logoutModalConfirmHandler = () => {
    logout();
    dispatch(uiActions.setLogoutConfirmModalState(false));
  };

  const logoutModalCancelHandler = () => {
    dispatch(uiActions.setLogoutConfirmModalState(false));
  };

  const linkClass = ({ isActive }) => {
    return isActive
      ? 'side-drawer__link side-drawer__link--active'
      : 'side-drawer__link';
  };

  return (
    <ul
      className={`side-drawer__list ${
        props.drawerIsOpen && 'side-drawer__list--active'
      }`}
    >
      {showLogoutConfrimModal && (
        <ConfirmModal
          title="Logout?"
          message="Do you really want to logout?"
          onConfirm={logoutModalConfirmHandler}
          onCancel={logoutModalCancelHandler}
        />
      )}
      {isLoggedIn && (
        <div className="side-drawer__user--box">
          <img
            className="side-drawer__user--photo"
            src={
              loggedInUser.photo
                ? `http://192.168.0.106:3000/users/${loggedInUser.photo}`
                : defaultUserJpg
            }
            alt="user-avatar"
          />

          <div className="side-drawer__user--info">
            <p className="side-drawer__user--name">
              {loggedInUser.firstName} {loggedInUser.lastName}
            </p>
            <p className="side-drawer__user--email">{loggedInUser.email}</p>
          </div>
        </div>
      )}

      <li className="side-drawer__list--item" onClick={() => props.onCancel()}>
        <NavLink className={linkClass} to="/">
          <div className="side-drawer__link-icon-text--holder">
            <FontAwesomeIcon
              className="side-drawer__link--icon"
              icon={faListAlt}
            />
            <span className="side-drawer__link--text">Posts</span>
          </div>
          <FontAwesomeIcon
            className="side-drawer__icon--chevron"
            icon={faChevronRight}
          />
        </NavLink>
      </li>

      {!isLoggedIn && (
        <li
          className="side-drawer__list--item"
          onClick={() => props.onCancel()}
        >
          <NavLink className={linkClass} to="/auth">
            <div className="side-drawer__link-icon-text--holder">
              <FontAwesomeIcon
                className="side-drawer__link--icon"
                icon={faKey}
              />
              <span className="side-drawer__link--text">Login</span>
            </div>
            <FontAwesomeIcon
              className="side-drawer__icon--chevron"
              icon={faChevronRight}
            />
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li
          className="side-drawer__list--item"
          onClick={() => props.onCancel()}
        >
          <NavLink className={linkClass} to="/posts/new">
            <div className="side-drawer__link-icon-text--holder">
              <FontAwesomeIcon
                className="side-drawer__link--icon"
                icon={faFont}
              />
              <span className="side-drawer__link--text">Add Post</span>
            </div>
            <FontAwesomeIcon
              className="side-drawer__icon--chevron"
              icon={faChevronRight}
            />
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li
          className="side-drawer__list--item"
          onClick={() => props.onCancel()}
        >
          <NavLink className={linkClass} to={`/${loggedInUser._id}/posts`}>
            <div className="side-drawer__link-icon-text--holder">
              <FontAwesomeIcon
                className="side-drawer__link--icon"
                icon={faList}
              />
              <span className="side-drawer__link--text">My Posts</span>
            </div>
            <FontAwesomeIcon
              className="side-drawer__icon--chevron"
              icon={faChevronRight}
            />
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li
          className="side-drawer__list--item"
          onClick={() => props.onCancel()}
        >
          <NavLink className={linkClass} to="/user-update">
            <div className="side-drawer__link-icon-text--holder">
              <FontAwesomeIcon
                className="side-drawer__link--icon"
                icon={faUserEdit}
              />
              <span className="side-drawer__link--text">Edit Profile</span>
            </div>
            <FontAwesomeIcon
              className="side-drawer__icon--chevron"
              icon={faChevronRight}
            />
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="side-drawer__list--item" onClick={logoutHandler}>
          <button className="side-drawer__logout--btn">
            <div className="side-drawer__link-icon-text--holder">
              <FontAwesomeIcon
                className="side-drawer__link--icon"
                icon={faSignOutAlt}
              />
              <span className="side-drawer__link--text">Logout</span>
            </div>
          </button>
        </li>
      )}
    </ul>
  );
};

export default SideDrawer;
