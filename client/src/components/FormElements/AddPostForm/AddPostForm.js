import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import useForm from '../../../hooks/form-hook';
import ImageUpload from '../ImageUpload/ImageUpload';
import Input from '../Input/Input';
import Button from '../../../utils/Button/Button';

import './AddPostForm.scss';
import useUpload from '../../../hooks/upload-hook';

const validateText = (value) => value.trim() !== '';

const AddPostForm = () => {
  const {
    imgFile,
    imgFilePickedRef,
    previewUrl,
    setPreviewUrl,
    imgFileIsValid,
    pickImgHandler,
    imgPickedHandler,
    resetImgFile,
  } = useUpload();

  const {
    value: enteredTitle,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    hasError: titleHasError,
    reset: titleReset,
  } = useForm(validateText);

  const {
    value: enteredDescr,
    valueChangeHandler: descrChangeHandler,
    valueBlurHandler: descrBlurHandler,
    isValid: descrIsValid,
    hasError: descrHasError,
    reset: descrReset,
  } = useForm(validateText);

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    const data = {
      imgFile,
      enteredTitle,
      enteredDescr,
    };

    console.log(data);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="add-post__container">
        <div className="add-post__img--input">
          <ImageUpload
            url={previewUrl}
            inputRef={imgFilePickedRef}
            onInputChange={imgPickedHandler}
            onPickImg={pickImgHandler}
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
