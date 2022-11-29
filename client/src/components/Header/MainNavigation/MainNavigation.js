import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './MainNavigation.scss';

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        {!isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/auth">
              Login
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/">
              Posts
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/addPost">
              Add Post
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link">My Posts</Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/myProfile">
              My Profile
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
