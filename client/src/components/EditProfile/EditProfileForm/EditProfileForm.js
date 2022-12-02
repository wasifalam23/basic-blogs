import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { postActions } from '../../../store/post-slice';
import useUpload from '../../../hooks/upload-hook';
import useForm from '../../../hooks/form-hook';
import useHttp from '../../../hooks/http-hook';
import Input from '../../FormElements/Input/Input';

import UserImageUpload from '../UserImageUpload/UserImageUpload';
import './EditProfileForm.scss';
import Button from '../../FormElements/Button/Button';

const validateText = (value) => value?.trim() !== '';
const emailValidate = (value) => value?.includes('@');

const EditProfileForm = () => {
  const { sendRequest: updateUser } = useHttp();

  const currUser = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const {
    imgFile,
    imgFilePickedRef,
    previewUrl,
    setPreviewUrl,
    imgFileIsValid,
    pickImgHandler,
    imgPickedHandler,
    inputKey,
    resetImgFile,
  } = useUpload();

  const {
    value: enteredFirstName,
    setEnteredValue: setFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    reset: firstNameReset,
  } = useForm(validateText);

  const {
    value: enteredLastName,
    setEnteredValue: setLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    reset: lastNameReset,
  } = useForm(validateText);

  const {
    value: enteredEmail,
    setEnteredValue: setEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
  } = useForm(emailValidate);

  const {
    value: enteredCurrPassword,
    setEnteredValue: setCurrPassword,
    valueChangeHandler: currPasswordChangeHandler,
    valueBlurHandler: currPasswordBlurHandler,
    isValid: currPasswordIsValid,
    hasError: currPasswordHasError,
    reset: currPasswordReset,
  } = useForm(validateText);

  const {
    value: enteredNewPassword,
    setEnteredValue: setNewPassword,
    valueChangeHandler: newPasswordChangeHandler,
    valueBlurHandler: newPasswordBlurHandler,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    reset: newPasswordReset,
  } = useForm(validateText);

  const {
    value: enteredConfirmPassword,
    setEnteredValue: setConfirmPassword,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    reset: confirmPasswordReset,
  } = useForm(validateText);

  useEffect(() => {
    setPreviewUrl(`http://localhost:3000/users/${currUser.photo}`);
    setFirstName(currUser.firstName);
    setLastName(currUser.lastName);
    setEmail(currUser.email);
  }, [
    currUser.photo,
    setPreviewUrl,
    setFirstName,
    setLastName,
    currUser.firstName,
    currUser.lastName,
    setEmail,
    currUser.email,
  ]);

  const token = localStorage.getItem('token');

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const accountFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const formData = new FormData();

    formData.append('photo', imgFile ? imgFile : 'default.jpg');
    formData.append('firstName', enteredFirstName);
    formData.append('lastName', enteredLastName);
    formData.append('email', enteredEmail);

    const updatedUserData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(userActions.setUserChanged());
        resetImgFile();
        firstNameReset();
        lastNameReset();
        emailReset();
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/users/updateMe`,
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    updateUser(reqConfig, updatedUserData);
  };

  return (
    <div className="edit-profile__container">
      <div className="edit-profile__inputs--holder">
        <div className="edit-profile__account-inputs--holder">
          <form onSubmit={accountFormSubmitHandler}>
            <UserImageUpload
              className="edit-profile__user-img--upload"
              value={imgFile}
              id="user-upload"
              url={previewUrl}
              inputRef={imgFilePickedRef}
              onInputChange={imgPickedHandler}
              onPickImg={pickImgHandler}
              inputKey={inputKey}
              reset={resetImgFile}
            />

            <div>
              <h3 className="edit-profile__input-type--title">
                Your Account Settings
              </h3>
              <div className="edit-profile__text-inputs--holder">
                <Input
                  field="input"
                  id="first-name"
                  placeholder="First Name"
                  type="text"
                  value={enteredFirstName}
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                  hasError={firstNameHasError}
                  errorMsg="First Name must not be empty"
                />
                <Input
                  field="input"
                  id="last-name"
                  placeholder="Last Name"
                  type="text"
                  value={enteredLastName}
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                  hasError={lastNameHasError}
                  errorMsg="Last Name must not be empty"
                />
                <Input
                  field="input"
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  hasError={emailHasError}
                  errorMsg="Email must not be empty"
                />
                <Button
                  type="submit"
                  className="edit-profile__account-save--btn"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="edit-profile__password-inputs--holder">
          <form>
            <div>
              <h3 className="edit-profile__input-type--title">
                Change Password
              </h3>
              <div className="edit-profile__text-inputs--holder">
                <Input
                  field="input"
                  id="curr-pass"
                  placeholder="Current Password"
                  type="password"
                  value={enteredCurrPassword}
                  onChange={currPasswordChangeHandler}
                  onBlur={currPasswordBlurHandler}
                  hasError={currPasswordHasError}
                  errorMsg="You must enter your current password"
                />
                <Input
                  field="input"
                  id="new-pass"
                  placeholder="New Password"
                  type="password"
                  value={enteredNewPassword}
                  onChange={newPasswordChangeHandler}
                  onBlur={newPasswordBlurHandler}
                  hasError={newPasswordHasError}
                  errorMsg="You must enter a new password"
                />
                <Input
                  field="input"
                  id="confirm-pass"
                  placeholder="First Name"
                  type="text"
                  value={enteredConfirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                  hasError={confirmPasswordHasError}
                  errorMsg="You must confirm your new password"
                />
                <Button
                  type="submit"
                  className="edit-profile__account-save--btn"
                >
                  Save Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
