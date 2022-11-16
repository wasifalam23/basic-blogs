import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import './ImageUpload.scss';

const ImageUpload = (props) => {
  const image = (
    <div className="image-upload__img--holder">
      <header className="image-upload__img--header">
        <button
          type="button"
          className="image-upload__img--edit-btn"
          onClick={props.onPickImg}
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
          onClick={props.reset}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="image-upload__img--cross-icon"
          />
        </button>
      </header>
      <img className="image-upload__img--image" src={props.url} alt="preview" />
    </div>
  );

  const pickImage = (
    <div className="image-upload__pick--holder" onClick={props.onPickImg}>
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
        ref={props.inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: 'none' }}
        onChange={props.onInputChange}
      />

      <main className="image-upload__preview">
        {props.url && image}
        {!props.url && pickImage}
      </main>
    </div>
  );
};

export default ImageUpload;
