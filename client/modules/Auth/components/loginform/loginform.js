import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, SubmitButton } from '../../../../components/form/formInputs';

import styles from './loginform.css';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required!';
  }
  if (!values.password) {
    errors.password = 'Required!';
  }
  return errors;
}

const formStyle = { width: '300px;' };

let LoginForm = ({ handleSubmit, login, message, invalid, submitting, pristine }) => (
  <div>
    <h1>Login</h1>
    <form className={styles['login-form']} onSubmit={handleSubmit(login)}>
      <div className={styles['login-error']}>{message}</div>
      <Field name="email" icon="fa-envelope" component={renderInput} type="text" label="Email" />
      <Field name="password" icon="fa-unlock-alt" component={renderInput} type="password" label="Password" />
      <SubmitButton text="sign in" disabled={{ invalid, submitting, pristine }} />
    </form>
  </div>
)

export default reduxForm({ form: 'loginForm', validate })(LoginForm);