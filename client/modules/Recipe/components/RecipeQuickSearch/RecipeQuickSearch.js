import React, { Component, PropTypes } from 'react';
import Select, { Async } from 'react-select';
import { Link } from 'react-router';
import callApi from '../../../../util/apiCaller';
import { Field, reduxForm } from 'redux-form';

// Import Style
import styles from './RecipeQuickSearch.css';

export class RecipeQuickSearch extends Component {
  constructor() {
    super();
    this.state = {
      ingredientsValue: [],
      categoriesValue: ''
    };
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.handleQuickSearch)} className={styles['search-form']}>
        <div>
          Show me
        <Field name="category" component="select" className={styles['select-category']}>
            {this.props.categories.map((category, i) => {
              return <option key={i} value={category._id}>{category.plural}</option>;
            })}
          </Field>
        </div>
        <div>
          with
        <Field name="ingredient1" component="input" type="text" className={styles['input-ingredient']} />
        </div>
        <div>
          and
        <Field name="ingredient2" component="input" type="text" className={styles['input-ingredient']} />
        </div>
        <div className={styles['button-container']}>
        <div onClick={this.props.handleSubmit(this.props.handleQuickSearch)} className={styles['recipe-search-button']}>
          Go!
        </div>
        </div>
      </form>
    );
  }
}

RecipeQuickSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
  })).isRequired,
  handleQuickSearch: PropTypes.func.isRequired,
};

RecipeQuickSearch = reduxForm({
  form: 'quickSearchForm',
  initialValues: {
    category: 'smoothie',
    ingredient1: 'tomato',
    ingredient2: 'mango'
  }
})(RecipeQuickSearch);

export default RecipeQuickSearch;
