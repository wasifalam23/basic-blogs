import React from 'react';
import Button from '../FormElements/Button/Button';
import Input from '../FormElements/Input/Input';

const Login = () => {
  return (
    <div className="auth-form__form--container">
      <h3 className="auth-form__form--title">Login to your account</h3>

      <form className="auth-form__form--control">
        <Input field="input" placeholder="Email" />
        <Input field="input" placeholder="Password  " />
        <Button type="submit" className="auth-form__form--btn">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
