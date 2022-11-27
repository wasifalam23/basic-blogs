import React from 'react';
import useForm from '../../hooks/form-hook';

import Input from '../FormElements/Input/Input';
import Button from '../FormElements/Button/Button';

const nameValidate = (value) => value.trim() !== '';
const emailValidate = (value) => value.includes('@');
const passwordValidate = (value) => value.trim().length >= 8;

const Signup = () => {
  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    reset: firstNameReset,
  } = useForm(nameValidate);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    reset: lastNameReset,
  } = useForm(nameValidate);

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

  const {
    value: enteredConfPass,
    valueChangeHandler: confPassChangeHandler,
    valueBlurHandler: confPassBlurHandler,
    isValid: confPassIsValid,
    hasError: confPassHasError,
    reset: confPassReset,
  } = useForm(passwordValidate);

  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Start today</p>
      <h3 className="auth-form__form--title">Create your account</h3>

      <form className="auth-form__form--control">
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
        <Button className="auth-form__form--btn" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
