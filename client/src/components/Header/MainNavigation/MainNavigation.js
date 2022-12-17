import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavUser from '../NavUser/NavUser';

import './MainNavigation.scss';

const MainNavigation = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.user.userData);

  const linkClass = ({ isActive }) => {
    return isActive
      ? 'main-navigation__link main-navigation__link--active'
      : 'main-navigation__link';
  };

  return (
    <ul
      className={`main-navigation__list ${
        props.drawerIsOpen && 'main-navigation__list--active'
      }`}
    >
      {isLoggedIn && (
        <div className="main-navigation__user--box">
          <img
            className="main-navigation__user--photo"
            src={`http://localhost:3000/users/${loggedInUser.photo}`}
            alt="user-avatar"
          />

          <div className="main-navigation__user--info">
            <p className="main-navigation__user--name">
              {loggedInUser.firstName} {loggedInUser.lastName}
            </p>
            <p className="main-navigation__user--email">{loggedInUser.email}</p>
          </div>
        </div>
      )}

      <li className="main-navigation__list--item">
        <NavLink className={linkClass} to="/">
          Posts
        </NavLink>
      </li>

      {!isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to="/auth">
            Login
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to="/posts/new">
            Add Post
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to={`/${loggedInUser._id}/posts`}>
            My Posts
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item main-navigation__edit-profile">
          <NavLink className={linkClass} to="/user-update">
            Edit Profile
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item main-navigation__logout">
          <button className="main-navigation__logout--btn">Logout</button>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item main-navigation__nav--user">
          <NavUser />
        </li>
      )}
    </ul>
  );
};

export default MainNavigation;
