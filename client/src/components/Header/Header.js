import React from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation/MainNavigation';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Basic Blogs
      </Link>
      <MainNavigation />
    </header>
  );
};

export default Header;
