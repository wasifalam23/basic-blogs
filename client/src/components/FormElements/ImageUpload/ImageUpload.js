import React, { useRef, useState, useEffect } from 'react';
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
            <img
              className="image-upload__image"
              src={previewUrl}
              alt="preview"
            />
          )}

          {!previewUrl && (
            <p className="image-upload__alter-text">Pick an image</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageUpload;
