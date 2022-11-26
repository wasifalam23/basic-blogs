import React from 'react';
import Input from '../../FormElements/Input/Input';

import './Signup.scss';

const Signup = () => {
  return (
    <div className="signup__container">
      <p className="signup__intro">Start today</p>
      <h3 className="signup__title">Create your account</h3>

      <form className="signup__form-control">
        <Input field="input" placeholder="First Name" />
        <Input field="input" placeholder="Last Name" />
        <Input field="input" placeholder="Email" />
        <Input field="input" placeholder="Password" />
        <Input field="input" placeholder="Confirm Password" />
      </form>
    </div>
  );
};

export default Signup;
