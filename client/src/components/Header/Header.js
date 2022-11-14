import React from 'react';
import MainNavigation from './MainNavigation/MainNavigation';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h3 className="header__logo">Basic Blogs</h3>
      <MainNavigation />
    </header>
  );
};

export default Header;
