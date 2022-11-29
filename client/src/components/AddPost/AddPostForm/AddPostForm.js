import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useForm from '../../../hooks/form-hook';
import useUpload from '../../../hooks/upload-hook';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import PostImageUpload from '../PostImageUpload/PostImageUpload';

import './AddPostForm.scss';
import useHttp from '../../../hooks/http-hook';

const validateText = (value) => value.trim() !== '';

const AddPostForm = () => {
  const { sendRequest: postData } = useHttp();

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
    value: enteredTitle,
    setEnteredValue: setTitle,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    hasError: titleHasError,
    reset: titleReset,
  } = useForm(validateText);

  const {
    value: enteredDescr,
    setEnteredValue: setDescr,
    valueChangeHandler: descrChangeHandler,
    valueBlurHandler: descrBlurHandler,
    isValid: descrIsValid,
    hasError: descrHasError,
    reset: descrReset,
  } = useForm(validateText);

  const token = localStorage.getItem('token');

  let formIsValid = false;
  if (titleIsValid && descrIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const formData = new FormData();

    formData.append('image', imgFile);
    formData.append('title', enteredTitle);
    formData.append('description', enteredDescr);

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/blogs',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const receivedPostData = (data) => {
      console.log(data);
    };

    postData(reqConfig, receivedPostData);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="add-post__container">
        <div className="add-post__img--input">
          <PostImageUpload
            url={previewUrl}
            inputRef={imgFilePickedRef}
            onInputChange={imgPickedHandler}
            onPickImg={pickImgHandler}
            inputKey={inputKey}
            reset={resetImgFile}
          />
        </div>

        <div className="add-post__text--inputs">
          <Input
            field="input"
            id="title"
            placeholder="Give a title"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            hasError={titleHasError}
            errorMsg="Title must not be empty!"
          />
          <Input
            field="textarea"
            id="description"
            placeholder="Give a description..."
            type="text"
            className="add-post__input--description"
            value={enteredDescr}
            onChange={descrChangeHandler}
            onBlur={descrBlurHandler}
            hasError={descrHasError}
            errorMsg="Description must not be empty"
          />
        </div>
        <Button
          type="submit"
          className="add-post__publish--btn"
          icon={faPaperPlane}
        >
          Publish
        </Button>
      </div>
    </form>
  );
};

export default AddPostForm;
