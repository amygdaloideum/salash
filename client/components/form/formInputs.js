import React, { Component, PropTypes } from 'react';

import styles from './forminputs.css';

export const renderInput = ({ input, label, icon, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    {label ?
      <div className={styles['label-row']}>
        <h2>{label}</h2> {touched && error && <span className={styles['validation-error']}>{error}</span>}
      </div> : null
    }
    <div className={styles['input-field']}>
      {/*icon ? <i className={`fa ${icon}`}></i> : null*/}
      <input {...input} type={type} />
    </div>
  </div>
);

export const renderTextarea = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    {label ?
      <div className={styles['label-row']}>
        <h2>{label}</h2> {touched && error && <span className={styles['validation-error']}>{error}</span>}
      </div> : null
    }
    <textarea {...input} type={type} placeholder={placeholder} />
  </div>
);

export const SubmitButton = ({ text, disabled: {invalid, submitting, pristine } }) => (
  <button className={styles['submit-button']} disabled={invalid || submitting || pristine} type="submit">{text}</button>
);

export const SubmitButtonNoValidation = ({ text, submit }) => (
  <button onClick={submit} className={styles['submit-button']} type="button">{text}</button>
);