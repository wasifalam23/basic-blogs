import React from 'react';
import './Container.scss';

const Container = (props) => {
  return (
    <div className={`container ${props.className}`}>
      <header className="container__header">
        <h3 className="container__title">{props.title}</h3>
        {props.button && props.button}
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Container;
