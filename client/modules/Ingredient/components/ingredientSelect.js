import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import styles from './IngredientSelect.css';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles.row}>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


const renderIngredients = ({ fields }) => (
  <div className={styles.container} >
    <label>Ingredients</label> <button type='button' onClick={() => fields.push()}>Add</button>
    <ul className={styles['ingredients-list']}>
      {fields.map((field, index) =>
        <li key={index}>
          <Field
            name={`${field}.amount`}
            type="text"
            component={renderField}
            label="amount" />
          of
          <Field
            name={`${field}.ingredient`}
            type="text"
            component={renderField}
            label="ingredient" />
          <button type="button" onClick={() => fields.remove(index)}>remove</button>
        </li>
      )}
    </ul>
  </div>
);


export default renderIngredients;