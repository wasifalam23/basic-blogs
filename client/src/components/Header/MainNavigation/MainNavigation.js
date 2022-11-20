import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.scss';

const MainNavigation = () => {
  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/">
            Posts
          </Link>
        </li>

        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/addPost">
            Add Post
          </Link>
        </li>

        <li className="main-navigation__list--item">
          <Link className="main-navigation__link">My Posts</Link>
        </li>

        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/myProfile">
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
