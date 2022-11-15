import React from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import './AddPostForm.scss';

const AddPostForm = () => {
  return (
    <form>
      <div className="add-post__container">
        <div className="add-post__img--input">
          <ImageUpload />
        </div>

        <div className="add-post__text--inputs">left</div>
      </div>
    </form>
  );
};

export default AddPostForm;
