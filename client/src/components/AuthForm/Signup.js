import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import {
  VALIDATE_TEXT_REQUIRED,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '../FormElements/validator';

import useHttp from '../../hooks/http-hook';
import useForm from '../../hooks/form-hook';

import Input from '../FormElements/Input/Input';
import Button from '../FormElements/Button/Button';

const Signup = () => {
  const { sendRequest: createUser } = useHttp();

  const dispatch = useDispatch();

  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    reset: firstNameReset,
  } = useForm(VALIDATE_TEXT_REQUIRED);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    reset: lastNameReset,
  } = useForm(VALIDATE_TEXT_REQUIRED);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
  } = useForm(VALIDATE_EMAIL);

  const {
    value: enteredPass,
    valueChangeHandler: passChangeHandler,
    valueBlurHandler: passBlurHandler,
    isValid: passIsValid,
    hasError: passHasError,
    reset: passReset,
  } = useForm(VALIDATE_PASSWORD);

  const {
    value: enteredConfPass,
    valueChangeHandler: confPassChangeHandler,
    valueBlurHandler: confPassBlurHandler,
    isValid: confPassIsValid,
    hasError: confPassHasError,
    reset: confPassReset,
  } = useForm(VALIDATE_PASSWORD);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passIsValid &&
    confPassIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const createdUserData = (data) => {
      if (data.status === 'success') {
        dispatch(authActions.setIsLoggedIn(true));
        console.log('You have successfully logged in!');
      } else if (data.status === 'fail') {
        console.log(data.message);
      }
    };

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/users/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPass,
        passwordConfirm: enteredConfPass,
      }),
    };

    createUser(reqConfig, createdUserData);
  };

  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Start today</p>
      <h3 className="auth-form__form--title">Create your account</h3>

      <form onSubmit={formSubmitHandler} className="auth-form__form--control">
        <Input
          field="input"
          id="signup-first-name"
          placeholder="First Name"
          type="text"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          hasError={firstNameHasError}
          errorMsg="First Name is a required field"
        />
        <Input
          field="input"
          id="signup-last-name"
          placeholder="Last Name"
          type="text"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          hasError={lastNameHasError}
          errorMsg="Last Name is a required field"
        />
        <Input
          field="input"
          id="signup-email"
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
          id="signup-password"
          placeholder="Password"
          type="password"
          value={enteredPass}
          onChange={passChangeHandler}
          onBlur={passBlurHandler}
          hasError={passHasError}
          errorMsg="Password should be atleast 8 characters long"
        />
        <Input
          field="input"
          id="signup-confirm-password"
          placeholder="Confirm Password"
          type="password"
          value={enteredConfPass}
          onChange={confPassChangeHandler}
          onBlur={confPassBlurHandler}
          hasError={confPassHasError}
          errorMsg="Confirm password should be atleast 8 characters long"
        />
        <Button type="submit" className="auth-form__form--btn">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
