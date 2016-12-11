import React, { Component, PropTypes } from 'react';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import RecipeEditor from '../RecipeEditor/RecipeEditor';
import CategorySelect from '../../../Category/components/CategorySelect';
import { renderTextarea, renderInput, SubmitButton } from '../../../../components/form/formInputs';
import IngredientAndAmountSelect from '../../../Ingredient/components/IngredientAndAmountSelect/IngredientAndAmountSelect';

import styles from './RecipeCreateForm.css';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'required';
  }
  if (!values.categories.length) {
    errors.categories = 'at least one category required';
  }
  if (!values.ingredients.length) {
    errors.categories = 'at least one ingredient required';
  }
  return errors;
}

let RecipeCreateForm = ({ editMode,handleSubmit, handleCreate, categories, invalid, submitting, pristine }) => (
  <form onSubmit={handleSubmit(handleCreate)} className={styles['create-form']}>

    <Field name="title" icon="fa-pencil-square-o" component={renderInput} type="text" label="Title" />

    <Field name="description" component={renderTextarea} placeholder="write a short description of the recipe" label="Description" />
    
    <div className={styles['text-container']}>
      <Field name='categories' options={categories.map(c => c.name)} component={CategorySelect} />
    </div>

    <FieldArray name="ingredients" component={IngredientAndAmountSelect} />

    <div className={styles['text-container']}>
      <label>Instructions</label>
      <Field name="instructions" type="text" component={RecipeEditor} />
    </div>

    <SubmitButton text={editMode ? 'save changes' : 'add recipe'} disabled={{ invalid, submitting, pristine }} />
  </form>
);

RecipeCreateForm = reduxForm({
  form: 'RecipeCreateForm',
  validate
})(RecipeCreateForm);



export default RecipeCreateForm;