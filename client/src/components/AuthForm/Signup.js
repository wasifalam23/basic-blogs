import React from 'react';
import Input from '../FormElements/Input/Input';
import Button from '../FormElements/Button/Button';

const Signup = () => {
  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Start today</p>
      <h3 className="auth-form__form--title">Create your account</h3>

      <form className="auth-form__form--control">
        <Input field="input" placeholder="First Name" />
        <Input field="input" placeholder="Last Name" />
        <Input field="input" placeholder="Email" />
        <Input field="input" placeholder="Password" />
        <Input field="input" placeholder="Confirm Password" />
        <Button className="auth-form__form--btn" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
