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
      <div className={styles['single-recipe']}>
        <h1>{this.props.recipe.title}</h1>
        <div className={styles['categories']}>
          {this.props.recipe.categories.map((cat, i) => (
            <span key={i}>{cat.title}</span>
          ))}
        </div>

        <p>{this.props.recipe.description}</p>
        
        <div>
          <h3>Ingredients</h3>
          <table>
            {this.props.recipe.ingredients.map((ing, i) => (
              <tr key={i}>
                <td>{ing.ingredient}</td>
                <td>{ing.amount}</td>
              </tr>
            ))}
          </table>
        </div>
        <h3>Instructions</h3>
        <p>{this.props.recipe.instructions}</p>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeDetailsPage.need = [({ params }) => {
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
