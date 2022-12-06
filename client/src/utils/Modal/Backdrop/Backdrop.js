import React from 'react';
import ReactDOM from 'react-dom';
import './Backdrop.scss';

const Backdrop = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className={`backdrop ${props.className}`}
          onClick={props.onCancel}
        />,
        document.getElementById('backdrop-root')
      )}
    </React.Fragment>
  );
};

export default Backdrop;
