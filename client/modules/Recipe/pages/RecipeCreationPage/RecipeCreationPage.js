import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRecipeRequest } from '../../RecipeActions';
import Select from 'react-select';
import callApi from '../../../../util/apiCaller';

// Import Style
import styles from './RecipeCreationPage.css';

export class RecipeCreationPage extends Component {
  constructor() {
    super();
    this.state = {
      ingredientsValue: [],
      categoriesValue: []
    };
  }

  addRecipe = (name, title, content) => {
    const titleRef = this.refs.title;
    const descRef = this.refs.description;

    let requestBody = {
      title: titleRef.value,
      description: descRef.value,
      ingredients: this.state.ingredientsValue,
      categories: this.state.categoriesValue
    };

    if (titleRef.value && descRef.value) {
      this.props.dispatch(addRecipeRequest(requestBody));
      titleRef.value = descRef.value = '';
    }
  };

  updateIngredientValue = (newValue) => {
		this.setState({
			ingredientsValue: newValue
		});
	}

  updateCategoryValue = (newValue) => {
		this.setState({
			categoriesValue: newValue
		});
	}

  getIngredients = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callApi(`ingredients/${encodeURIComponent(input)}`).then( res => {
      return { options: res.ingredients };
    });
  }

  getCategories = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callApi(`categories/${encodeURIComponent(input)}`).then( res => {
      return { options: res.categories };
    });
  }

  render() {
    return (
      <div className={styles['create-form']}>
        <h2 className={styles['create-title']}>Add recipe!</h2>
        <input className={styles['create-input']} placeholder='Title' ref="title" />
        <Select.Async
          className={styles['select']}
          name="form-field-name"
          value={this.state.ingredientsValue}
          onChange={this.updateIngredientValue}
          placeholder='Ingredients'
          loadOptions={this.getIngredients}
          labelKey="title"
          cache={false}
          valueKey="title"
          multi={true}
        />
        <Select.Async
          className={styles['select']}
          name="form-field-name"
          value={this.state.categoriesValue}
          onChange={this.updateCategoryValue}
          placeholder='Categories'
          loadOptions={this.getCategories}
          cache={false}
          labelKey="title"
          valueKey="title"
          multi={true}
        />
        <textarea className={styles['create-input']} placeholder='Description' ref="description" />
        <a href="#" onClick={this.addRecipe}> Create</a>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {};
}

RecipeCreationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RecipeCreationPage);
