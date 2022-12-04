import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';
import { userActions } from '../../../store/user-slice';
import useUpload from '../../../hooks/upload-hook';
import useForm from '../../../hooks/form-hook';
import useHttp from '../../../hooks/http-hook';
import UserImageUpload from '../UserImageUpload/UserImageUpload';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';

const validateText = (value) => value?.trim() !== '';
const emailValidate = (value) => value?.includes('@');
const EditAccountForm = () => {
  const { photo, firstName, lastName, email } = useSelector(
    (state) => state.user.userData
  );
  const dispatch = useDispatch();

  const { sendRequest: updateUser } = useHttp();

  const [userUpdated, setUserUpdated] = useState(false);

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
    resetImgDone,
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

  useEffect(() => {
    if (!photo || !firstName || !lastName || !email) return;

    const photoUrl =
      photo !== 'default.jpg' ? `http://localhost:3000/users/${photo}` : null;

    setPreviewUrl(photoUrl);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, [
    userUpdated,
    photo,
    setPreviewUrl,
    setFirstName,
    setLastName,
    firstName,
    lastName,
    setEmail,
    email,
  ]);

  const token = localStorage.getItem('token');

  let accountFormIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    accountFormIsValid = true;
  }

  const accountFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!accountFormIsValid) return;

    const formData = new FormData();

    if (imgFile) {
      formData.append('photo', imgFile);
    } else if (!imgFile && resetImgDone) {
      formData.append('photo', 'default.jpg');
    }
    formData.append('firstName', enteredFirstName);
    formData.append('lastName', enteredLastName);
    formData.append('email', enteredEmail);

    const updatedUserData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(userActions.setUserChanged());
        setUserUpdated((prev) => !prev);
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
            <Button type="submit" className="edit-profile__account-save--btn">
              Save Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAccountForm;
