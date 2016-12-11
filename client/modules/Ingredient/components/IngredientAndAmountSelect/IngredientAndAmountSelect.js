import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import styles from './IngredientAndAmountSelect.css';

const renderField = ({ className, input, label, type, meta: { touched, error } }) => (
  <div className={styles.row}>
    <div>
      <input {...input} className={className} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


const renderIngredients = ({ fields }) => (
  <div className={styles.container} >
    <div className={styles.title}>
      <label>Ingredients</label>
      <a type='button' onClick={() => fields.push()}><i className="material-icons">add</i>Add</a>
    </div>
    <ul className={styles['ingredients-list']}>
      {fields.map((field, index) =>
        <li key={index}>
          <Field
            name={`${field}.amount`}
            type="text"
            component={renderField}
            className={styles.amount}
            label="amount" />
          of
          <Field
            name={`${field}.name`}
            type="text"
            component={renderField}
            className={styles.name}
            label="ingredient" />
          <a className={styles.remove} type="button" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
        </li>
      )}
    </ul>
  </div>
);


export default renderIngredients;