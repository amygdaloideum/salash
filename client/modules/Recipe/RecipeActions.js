import callApi from '../../util/apiCaller';
import { build } from '../../util/queryBuilder';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPES = 'ADD_RECIPES';
// Export Actions

export function addRecipes(recipes) {
  return {
    type: ADD_RECIPES,
    recipes,
  };
}

export function addRecipe(recipe) {
  return {
    type: ADD_RECIPE,
    recipe,
  };
}

export function fetchRecipes() {
  return (dispatch) => {
    return callApi('recipes').then(res => {
      dispatch(addRecipes(res.recipes));
    });
  };
}

export function fetchRecipe(cuid) {
  return (dispatch) => {
    return callApi(`recipes/${cuid}`).then(res => dispatch(addRecipe(res.recipe)));
  };
}

export function searchRecipes(query) {
  return (dispatch) => {
    return callApi(build(query)).then(res => {
      dispatch(addRecipes(res.recipes));
    });
  };
}

export function addRecipeRequest(recipe) {
  return (dispatch) => {
    return callApi('recipes', 'post', { recipe }).then(res => {
      browserHistory.push('/created');
    });
  };
}
