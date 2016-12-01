import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import styles from './RecipeDetailPage.css';
import { LoveButton, FavButton } from '../../../../components/InteractionButtons/InteractionButtons'

// Import Actions
import {
  fetchRecipe,
  loveRecipeRequest,
  unloveRecipeRequest,
  favoriteRecipeRequest,
  unfavoriteRecipeRequest
} from '../../RecipeActions';

// Import Selectors
import { getRecipe } from '../../RecipeReducer';

class RecipeDetailsPage extends Component {

  love = () => {
    this.props.dispatch(loveRecipeRequest(this.props.recipe));
  }

  unlove = () => {
    this.props.dispatch(unloveRecipeRequest(this.props.recipe));
  }

  favorite = () => {
    this.props.dispatch(favoriteRecipeRequest(this.props.recipe));
  }

  unfavorite = () => {
    this.props.dispatch(unfavoriteRecipeRequest(this.props.recipe));
  }

  render() {
    return (
      <div className={styles['single-recipe']}>
        {
          this.props.recipe.imageUrl ? <div className={styles['image-wrapper']}><img src={this.props.recipe.imageUrl} /></div> : null
        }
        <h1>{this.props.recipe.title}</h1>
        <div className={styles['categories']}>
          {this.props.recipe.categories.map((cat, i) => (
            <span key={i}>{cat.name}</span>
          ))}
        </div>

        <p>{this.props.recipe.description}</p>

        <div>
          <h3>Ingredients</h3>
          <table>
            <tbody>
              {this.props.recipe.ingredients.map((ing, i) => (
                <tr key={i}>
                  <td>{ing.name}</td>
                  <td>{ing.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Instructions</h3>
        <p>{this.props.recipe.instructions}</p>
        <div className={styles['int-buttons']}>
          <LoveButton loveAction={this.love} unloveAction={this.unlove} interactions={this.props.recipe.interactions} />
          <FavButton favoriteAction={this.favorite} unfavoriteAction={this.unfavorite} interactions={this.props.recipe.interactions} />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeDetailsPage.need = [({ params, state }) => {
  return fetchRecipe(params.cuid, state.auth.token);
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
