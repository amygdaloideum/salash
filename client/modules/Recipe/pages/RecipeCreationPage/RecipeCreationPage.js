import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRecipeRequest } from '../../RecipeActions';
import callApi from '../../../../util/apiCaller';

import RecipeCreateForm from '../../components/RecipeCreateForm/RecipeCreateForm'; 

// Import Style
import styles from './RecipeCreationPage.css';

// Import Actions
import { fetchCategories } from '../../../Category/CategoryActions';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';

export class RecipeCreationPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleCreate = (fields) => {
    this.props.dispatch(addRecipeRequest(fields));
  };

  initialValues = {
    categories: [],
    ingredients: [
      { amount: '', name: '' }
    ]
  };

  render() {
    return (
      <div className={styles.create}>
        <h1>add recipe</h1>
        <RecipeCreateForm initialValues={this.initialValues} handleCreate={this.handleCreate} categories={this.props.categories}/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeCreationPage.need = [() => { return fetchCategories(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
  };
}

RecipeCreationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RecipeCreationPage);
