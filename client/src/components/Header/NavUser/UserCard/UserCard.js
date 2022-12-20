import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../../store/ui-slice';

import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserEdit,
  faChevronRight,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import Backdrop from '../../../../utils/Modal/Backdrop/Backdrop';

import './UserCard.scss';

const UserCard = (props) => {
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(uiActions.setLogoutConfirmModalState(true));
    dispatch(uiActions.setUserCardClose());
  };

  return (
    <div className="user-card__container">
      <div className="user-card__user--holder">
        <img
          className="user-card__user--photo"
          src={`http://192.168.0.106:3000/users/${user.photo}`}
          alt=""
        />
        <p className="user-card__user--name">
          {user.firstName} {user.lastName}
        </p>
        <p className="user-card__user--email">{user.email}</p>
      </div>

      <ul className="user-card__actions--holder">
        <li>
          <Link
            onClick={props.onCancel}
            className="user-card__edit-user--link"
            to="/user-update"
          >
            <FontAwesomeIcon
              className="user-card__edit-user--icon"
              icon={faUserEdit}
            />
            <span className="user-card__edit-user--text">Edit Profile</span>
            <FontAwesomeIcon
              className="user-card__chevron--icon"
              icon={faChevronRight}
            />
          </Link>
        </li>
        <li>
          <button className="user-card__logout--btn" onClick={logoutHandler}>
            <FontAwesomeIcon
              className="user-card__logout--icon"
              icon={faSignOutAlt}
            />
            <span className="user-card__logout--text">Logout</span>
            <FontAwesomeIcon
              className="user-card__chevron--icon"
              icon={faChevronRight}
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

const LoggedInUserCard = (props) => {
  return (
    <React.Fragment>
      <Backdrop onCancel={props.onCancel} className="user-card__backdrop" />

      {ReactDOM.createPortal(
        <UserCard onCancel={props.onCancel} />,
        document.getElementById('user-card-root')
      )}
    </React.Fragment>
  );
};

export default LoggedInUserCard;
