import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import './ImageUpload.scss';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickedRef = useRef();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickedRef.current.click();
  };

  const pickCancelHandler = () => {
    setPreviewUrl();
  };

  const image = (
    <div className="image-upload__img--holder">
      <header className="image-upload__img--header">
        <button
          type="button"
          className="image-upload__img--edit-btn"
          onClick={pickImageHandler}
        >
          <FontAwesomeIcon
            icon={faPen}
            className="image-upload__img--edit-icon"
          />
          <span className="image-upload__img--edit-text">Edit</span>
        </button>
        <button
          type="button"
          className="image-upload__img--cross-btn"
          onClick={pickCancelHandler}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="image-upload__img--cross-icon"
          />
        </button>
      </header>
      <img
        className="image-upload__img--image"
        src={previewUrl}
        alt="preview"
      />
    </div>
  );

  const pickImage = (
    <div className="image-upload__pick--holder" onClick={pickImageHandler}>
      <div className="image-upload__pick--img-holder">
        <FontAwesomeIcon
          icon={faImage}
          className="image-upload__pick--img-icon"
        />
      </div>
      <p className="image-upload__pick--text">Pick an image</p>
    </div>
  );

  return (
    <div className="image-upload__container">
      <input
        id={props.id}
        ref={filePickedRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: 'none' }}
        onChange={pickedHandler}
      />

      <main className="image-upload__preview">
        {previewUrl && image}
        {!previewUrl && pickImage}
      </main>
    </div>
  );
};

export default ImageUpload;
