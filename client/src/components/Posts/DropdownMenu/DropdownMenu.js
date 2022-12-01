import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import './DropdownMenu.scss';

const DropdownMenu = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOpenHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const editBtnClickHander = () => {
    props.onEdit();
    setIsMenuOpen(false);
  };

  return (
    <div className={`dropdown__container ${props.className}`}>
      <div className="dropdown__content">
        <button
          type="button"
          className="dropdown__action--btn"
          onClick={menuOpenHandler}
        >
          <FontAwesomeIcon
            className="dropdown__action--icon"
            icon={faEllipsisH}
          />
        </button>

        {isMenuOpen && (
          <div className="dropdown__btn--holder">
            {props.onEdit && (
              <button
                className="dropdown__edit--btn"
                onClick={editBtnClickHander}
              >
                Edit
              </button>
            )}
            <button className="dropdown__delete--btn" onClick={props.onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
