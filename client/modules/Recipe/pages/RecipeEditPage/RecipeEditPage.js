import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../../util/apiCaller';

import RecipeCreateForm from '../../components/RecipeCreateForm/RecipeCreateForm';

// Import Style
import styles from './RecipeEditPage.css';

// Import Actions
import { fetchCategories } from '../../../Category/CategoryActions';
import { fetchRecipe, updateRecipeRequest } from '../../RecipeActions';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';
import { getRecipe } from '../../RecipeReducer';

export class RecipeEditPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleCreate = (fields) => {
    this.props.dispatch(updateRecipeRequest(this.props.recipe.cuid, fields));
  };

  render() {
    return (
      <div className={styles.create}>
        <h1>Edit recipe</h1>
        <RecipeCreateForm editMode="true" initialValues={this.props.recipe} handleCreate={this.handleCreate} categories={this.props.categories} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeEditPage.need = [
  () => fetchCategories(),
  ({ params, state }) => fetchRecipe(params.cuid, state.auth.token)
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    categories: getCategories(state),
    recipe: getRecipe(state, props.params.cuid),
  };
}

RecipeEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recipe: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(RecipeEditPage);
