import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import styles from './RecipeDetailPage.css';

// Import Actions
import { fetchRecipe } from '../../RecipeActions';

// Import Selectors
import { getRecipe } from '../../RecipeReducer';

class RecipeDetailsPage extends Component {
  render() {
    return (
      <div>
        <h3 className={styles['single-recipe']}>{this.props.recipe.title}</h3>
        <div>
          <span>Categories: </span>
          {this.props.recipe.categories.map((cat) => (
            <span key={cat._id}>{cat.title}</span>
          ))}
        </div>
        <div>
          <span>Ingredients</span>
        </div>
        <p>{this.props.recipe.description}</p>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeDetailsPage.need = [params => {
  return fetchRecipe(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    recipe: getRecipe(state, props.params.cuid),
  };
}

RecipeDetailsPage.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(RecipeDetailsPage);
