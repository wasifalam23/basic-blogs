import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavUser from '../NavUser/NavUser';

import './MainNavigation.scss';

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
        {/* 
        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        )} */}

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
