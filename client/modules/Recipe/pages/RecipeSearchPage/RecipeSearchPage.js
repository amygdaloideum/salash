import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RecipeSearchBox from '../../components/RecipeSearchBox/RecipeSearchBox';

// Import Actions
import { fetchRecipes } from '../../RecipeActions';
import { toggleAddRecipe } from '../../../App/AppActions';

// Import Selectors
import { getShowAddRecipe } from '../../../App/AppReducer';

class RecipeSearchPage extends Component {
  render() {
    return (
      <div>
        <RecipeSearchBox />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
//RecipeSearchPage.need = [() => { return fetchRecipes(); }];

// Retrieve data from store as props
// function mapStateToProps(state) {
//   return {
//     showAddRecipe: getShowAddRecipe(state),
//     recipes: getRecipes(state),
//   };
// }
export default connect()(RecipeSearchPage);
