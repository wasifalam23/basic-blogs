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
    inputKey,
    resetImgFile,
  } = useUpload();

  return (
    <form>
      <div className="edit-profile__container">
        <div className="edit-profile__img--input">
          <UserImageUpload
            value={imgFile}
            id="user-upload"
            url={previewUrl}
            inputRef={imgFilePickedRef}
            onInputChange={imgPickedHandler}
            onPickImg={pickImgHandler}
            inputKey={inputKey}
            reset={resetImgFile}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
