import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RecipeList from '../../components/RecipeList';

// Import Actions
import { searchRecipes } from '../../RecipeActions';
import { toggleAddRecipe } from '../../../App/AppActions';

// Import Selectors
import { getShowAddRecipe } from '../../../App/AppReducer';
import { getRecipes } from '../../RecipeReducer';

class RecipeListPage extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(searchRecipes(this.props.routeParams.title));
  }

  render() {
    return (
      <div>
        <RecipeList recipes={this.props.recipes} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeListPage.need = [params => {
  return searchRecipes(params.title);
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddRecipe: getShowAddRecipe(state),
    recipes: getRecipes(state),
  };
}

RecipeListPage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  showAddRecipe: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

RecipeListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(RecipeListPage);
