import React, { Component, PropTypes } from 'react';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
//import RecipeEditor from '../RecipeEditor/RecipeEditor';
import CategorySelect from '../../../Category/components/CategorySelect';
import IngredientSelect from '../../../Ingredient/components/IngredientSelect';

import styles from './RecipeCreateForm.css';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required!';
  }
  return errors;
}

const renderInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles['text-container']}>
    <label>{label}</label>
    <div>
      <textarea {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let RecipeCreateForm = props => (
  <form onSubmit={props.handleSubmit(props.handleCreate)} className={styles['create-form']}>

    <Field name="title" component={renderInput} type="text" label="Title" />

    <div className={styles['text-container']}>
      <label>Categories</label>
      <Field name='categories' options={props.categories.map(c => c.title)} component={CategorySelect} />
    </div>

    <FieldArray name="ingredients" component={IngredientSelect} />

    <Field name="description" component={renderTextarea} label="Description" />

    <Field name="instructions" component={renderTextarea} label="Instructions" />

    {/*<div className={styles['text-container']}>
      <label>Instructions</label>
      <Field name="instructions" type="text" component={RecipeEditor} />
    </div>*/}

    <button type="submit" disabled={props.pristine || props.submitting}>Submit</button>
  </form>
);

RecipeCreateForm = reduxForm({
  form: 'RecipeCreateForm',
  initialValues: {
    categories: [],
    ingredients: [
      { amount: '', ingredient: '' }
    ]
  },
  validate
})(RecipeCreateForm);



export default RecipeCreateForm;