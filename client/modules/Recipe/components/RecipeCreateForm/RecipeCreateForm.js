import React, { Component, PropTypes } from 'react';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
//import RecipeEditor from '../RecipeEditor/RecipeEditor';
import CategorySelect from '../../../Category/components/CategorySelect';
import { renderTextarea, renderInput, SubmitButton} from '../../../../components/form/formInputs';
import IngredientSelect from '../../../Ingredient/components/IngredientSelect';

import styles from './RecipeCreateForm.css';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required!';
  }
  return errors;
}

let RecipeCreateForm = ({ handleSubmit, handleCreate, categories, invalid, submitting, pristine }) => (
  <form onSubmit={handleSubmit(handleCreate)} className={styles['create-form']}>

    <Field name="title" icon="fa-pencil-square-o" component={renderInput} type="text" label="Title" />

    <div className={styles['text-container']}>
      <Field name='categories' options={categories.map(c => c.title)} component={CategorySelect} />
    </div>

    <FieldArray name="ingredients" component={IngredientSelect} />

    <Field name="description" component={renderTextarea} label="Description" />

    <Field name="instructions" component={renderTextarea} label="Instructions" />

    <Field name="imageUrl" icon="fa-picture-o" component={renderInput} label="Image url" />

    {/*<div className={styles['text-container']}>
      <label>Instructions</label>
      <Field name="instructions" type="text" component={RecipeEditor} />
    </div>*/}
    <SubmitButton text="add recipe" disabled={{ invalid, submitting, pristine }} />
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