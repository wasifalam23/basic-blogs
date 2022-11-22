import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import addPhotoIcon from '../../../assets/add-photo.png';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import './UserImageUpload.scss';

const UserImageUpload = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const resetBtn = (
    <div className="user-upload__reset-img--box">
      <button
        type="button"
        className="user-upload__reset--btn"
        onClick={props.reset}
      >
        <FontAwesomeIcon className="user-upload__cross-icon" icon={faTimes} />
      </button>
    </div>
  );

  const image = (
    <div
      className="user-upload__image--holder"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img className="user-upload__image" src={props.url} alt="user" />
      {isHovered && resetBtn}
    </div>
  );

  const pickImgIcon = (
    <img
      className="user-upload__image-add--icon"
      src={addPhotoIcon}
      alt="add-img-icon"
    />
  );

  return (
    <div className="user-upload__container">
      <input
        style={{ display: 'none' }}
        id={props.id}
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={props.inputRef}
        onChange={props.onInputChange}
        key={props.inputKey}
      />

      <main className="user-upload__preview">
        {props.url && image}
        {!props.url && pickImgIcon}

        <button
          type="button"
          className="user-upload__pick-img--btn"
          onClick={props.onPickImg}
        >
          <FontAwesomeIcon icon={faPen} className="user-upload__pick--icon" />
        </button>
      </main>
    </div>
  );
};

export default UserImageUpload;
