import React from 'react';
import useUpload from '../../../hooks/upload-hook';
import UserImageUpload from '../UserImageUpload/UserImageUpload';

import './EditProfileForm.scss';

const EditProfileForm = () => {
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

  return (
    <form>
      <div className="edit-profile__container">
        <div className="edit-profile__img--input">
          <UserImageUpload
            url={previewUrl}
            inputRef={imgFilePickedRef}
            onInputChange={imgPickedHandler}
            onPickImg={pickImgHandler}
            reset={resetImgFile}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
