import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

// Import Style
import styles from './RecipeQuickSearch.css';

let RecipeQuickSearch = props => (
  <form onSubmit={props.handleSubmit(props.handleQuickSearch)} className={styles['search-form']}>
    <div>
      show me
        <Field name="category" component="select" className={styles['select-category']}>
        {props.categories.map((category, i) => {
          return <option key={i} value={category._id}>{`${category.name}s`}</option>;
        })}
      </Field>
    </div>
    <div>
      with
        <Field name="ingredient1" component="input" type="text" className={styles['input-ingredient1']} />
    </div>
    <div>
      and
        <Field name="ingredient2" component="input" type="text" className={styles['input-ingredient2']} />
    </div>
    <div className={styles['button-container']}>
      <div onClick={props.handleSubmit(props.handleQuickSearch)} className={styles['recipe-search-button']}>
        go
      </div>
    </div>
  </form>
);

RecipeQuickSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleQuickSearch: PropTypes.func.isRequired,
};

RecipeQuickSearch = reduxForm({
  form: 'quickSearchForm',
  initialValues: {
    category: 'smoothie',
    ingredient1: 'tomato',
    ingredient2: 'banana'
  }
})(RecipeQuickSearch);

export default RecipeQuickSearch;
