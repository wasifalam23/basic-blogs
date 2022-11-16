import React from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import Input from '../Input/Input';
import './AddPostForm.scss';

const AddPostForm = () => {
  return (
    <form>
      <div className="add-post__container">
        <div className="add-post__img--input">
          <ImageUpload />
        </div>

        <div className="add-post__text--inputs">
          <Input field="input" placeholder="Give a title" type="text" />
          <Input
            field="textarea"
            placeholder="Give a description..."
            type="text"
            className="add-post__input--description"
          />
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
