import React from 'react';
import useForm from '../../hooks/form-hook';
import Button from '../FormElements/Button/Button';
import Input from '../FormElements/Input/Input';

const emailValidate = (value) => value.includes('@');
const passwordValidate = (value) => value.trim().length >= 8;
const Login = () => {
  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
  } = useForm(emailValidate);

  const {
    value: enteredPass,
    valueChangeHandler: passChangeHandler,
    valueBlurHandler: passBlurHandler,
    isValid: passIsValid,
    hasError: passHasError,
    reset: passReset,
  } = useForm(passwordValidate);

  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Create Post</p>
      <h3 className="auth-form__form--title">Login to your account</h3>

      <form className="auth-form__form--control">
        <Input
          field="input"
          id="login-email"
          placeholder="Email"
          type="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
          errorMsg="Email is a required field"
        />
        <Input
          field="input"
          id="login-password"
          placeholder="Password"
          type="password"
          value={enteredPass}
          onChange={passChangeHandler}
          onBlur={passBlurHandler}
          hasError={passHasError}
          errorMsg="Password should be atleast 8 characters long"
        />
        <Button type="submit" className="auth-form__form--btn">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
