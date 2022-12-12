import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavUser from '../NavUser/NavUser';

import './MainNavigation.scss';

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUserId = useSelector((state) => state.user.userData._id);

  const linkClass = ({ isActive }) => {
    return isActive
      ? 'main-navigation__link main-navigation__link--active'
      : 'main-navigation__link';
  };

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li className="main-navigation__list--item ">
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
            <NavLink className={linkClass} to="/addPost">
              Add Post
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <NavLink className={linkClass} to={`/myPosts/${loggedInUserId}`}>
              My Posts
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <NavUser />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
