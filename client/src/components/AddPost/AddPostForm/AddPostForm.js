import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';

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
  const dispatch = useDispatch();

  const { sendRequest: postData } = useHttp();
  const { sendRequest: updateData } = useHttp();
  const { sendRequest: getDataById } = useHttp();

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
    reset: resetTitle,
  } = useForm(validateText);

  const {
    value: enteredDescr,
    setEnteredValue: setDescr,
    valueChangeHandler: descrChangeHandler,
    valueBlurHandler: descrBlurHandler,
    isValid: descrIsValid,
    hasError: descrHasError,
    reset: resetDescr,
  } = useForm(validateText);

  const token = localStorage.getItem('token');
  const { id: postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const postData = (data) => {
      const { title, description, image } = data.data.blog;

      setPreviewUrl(`http://localhost:3000/blogs/${image}`);
      setTitle(title);
      setDescr(description);
    };

    const reqConfig = {
      url: `http://localhost:3000/api/v1/blogs/${postId}`,
    };

    getDataById(reqConfig, postData);
  }, [postId, getDataById, setDescr, setPreviewUrl, setTitle]);

  let formIsValid = false;
  if (titleIsValid && descrIsValid) {
    formIsValid = true;
  }

  const resetForm = () => {
    resetImgFile();
    resetTitle();
    resetDescr();
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const formData = new FormData();

    formData.append('image', imgFile);
    formData.append('title', enteredTitle);
    formData.append('description', enteredDescr);

    if (postId) {
      const updatedPostData = (data) => {
        if (data.status === 'success') {
          dispatch(postActions.setPostChanged());
          resetForm();
        } else {
          console.log(data);
        }
      };

      const reqConfig = {
        url: `http://localhost:3000/api/v1/blogs/${postId}`,
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      updateData(reqConfig, updatedPostData);

      return;
    }

    const createdPostData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        resetForm();
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: 'http://localhost:3000/api/v1/blogs',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    postData(reqConfig, createdPostData);
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
