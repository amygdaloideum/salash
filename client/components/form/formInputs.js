import React, { Component, PropTypes } from 'react';

import styles from './forminputs.css';

export const renderInput = ({ input, label, icon, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    <div className={styles['label-row']}>
      <label>{label}</label> {touched && error && <span className={styles['validation-error']}>{error}</span>}
    </div>
    <div className={styles['input-field']}>
      {icon ? <i className={`fa ${icon}`}></i> : null}
      <input {...input} type={type} />
    </div>
  </div>
);

export const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    <label>{label}</label>
    <div>
      <textarea {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export const SubmitButton = ({ text, disabled: {invalid, submitting, pristine } }) => (
  <button className={styles['submit-button']} disabled={invalid || submitting || pristine} type="submit">{text}</button>
);