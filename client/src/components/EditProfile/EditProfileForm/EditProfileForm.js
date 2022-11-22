import React from 'react';
import useUpload from '../../../hooks/upload-hook';
import useForm from '../../../hooks/form-hook';
import Input from '../../FormElements/Input/Input';

import UserImageUpload from '../UserImageUpload/UserImageUpload';
import './EditProfileForm.scss';
import Button from '../../FormElements/Button/Button';

const validateText = (value) => value.trim() !== '';

const EditProfileForm = () => {
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
  } = useForm(validateText);

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

  return (
    <div className="edit-profile__container">
      <div className="edit-profile__inputs--holder">
        <div className="edit-profile__account-inputs--holder">
          <form>
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
                Account Information
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
                  Save
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
                  Save
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
