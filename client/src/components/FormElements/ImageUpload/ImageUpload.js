import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
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

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickedRef.current.click();
  };

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

      <main className="image-upload__content">
        <div className="image-upload__preview" onClick={pickImageHandler}>
          {previewUrl && (
            <div className="image-upload__image--holder">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="image-upload__cross-icon"
              />
              <img
                className="image-upload__image"
                src={previewUrl}
                alt="preview"
              />
            </div>
          )}

          {!previewUrl && (
            <div className="image-upload__pick--holder">
              <div className="image-upload__pick-img--holder">
                <FontAwesomeIcon
                  icon={faImage}
                  className="image-upload__pick-img--icon"
                />
              </div>
              <p className="image-upload__pick--text">Pick an image</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageUpload;
