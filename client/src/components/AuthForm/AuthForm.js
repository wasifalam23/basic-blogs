import React, { useState } from 'react';
import contentCreator from '../../assets/content-creator.svg';
import Signup from './Signup/Signup';
import Login from './Login/Login';

import './AuthForm.scss';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="auth-form__container">
      <div className="auth-form__intro--holder">
        <h3 className="auth-form__intro--title">Basic Blogs</h3>
        <p className="auth-form__intro--descr">
          A site user can create simple <br /> blog posts.
        </p>
        <img src={contentCreator} alt="" className="auth-form__intro--illus" />
      </div>
      <div className="auth-form__form--holder">
        {isLogin ? <isLogin /> : <Signup />}
      </div>
    </div>
  );
};

export default AuthForm;
