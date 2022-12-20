import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import Container from '../utils/Container/Container';
import './Pages.scss';

const Auth = () => {
  return (
    <div className="auth-page__container">
      <AuthForm />
    </div>
  );
};

export default Auth;
