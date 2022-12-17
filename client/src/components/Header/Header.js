import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation/MainNavigation';
import Backdrop from '../../utils/Modal/Backdrop/Backdrop';
import './Header.scss';

const Header = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const burgerClickHandler = () => {
    setDrawerIsOpen((prev) => !prev);
  };

  const backdropClickHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        {drawerIsOpen && (
          <Backdrop
            className="header__backdrop"
            onCancel={backdropClickHandler}
          />
        )}

        <Link to="/" className="header__logo">
          Basic Blogs
        </Link>

        <MainNavigation drawerIsOpen={drawerIsOpen} />

        <div className="header__burger" onClick={burgerClickHandler}>
          <div className="header__burger--line1 header__burger--item" />
          <div className="header__burger--line2 header__burger--item" />
          <div className="header__burger--line3 header__burger--item" />
          <div />
          <div />
        </div>
      </nav>
    </header>
  );
};

export default Header;
