import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

const Button = (props) => {
  return (
    <button
      className={`button ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      <FontAwesomeIcon className="button__icon" icon={props.icon} />
      {props.children}
    </button>
  );
};

export default Button;
