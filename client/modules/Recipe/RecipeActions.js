import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPES = 'ADD_RECIPES';
export const LOVE_RECIPE = 'LOVE_RECIPE';
export const UNLOVE_RECIPE = 'UNLOVE_RECIPE';
export const FAVORITE_RECIPE = 'FAVORITE_RECIPE';
export const UNFAVORITE_RECIPE = 'UNFAVORITE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';


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

export function loveRecipe(recipe) {
  return {
    type: LOVE_RECIPE,
    recipe
  };
}

export function unloveRecipe(recipe) {
  return {
    type: UNLOVE_RECIPE,
    recipe
  };
}

export function favoriteRecipe(recipe) {
  return {
    type: FAVORITE_RECIPE,
    recipe
  };
}

export function unfavoriteRecipe(recipe) {
  return {
    type: UNFAVORITE_RECIPE,
    recipe
  };
}

export function deleteRecipe(cuid) {
  return {
    type: DELETE_RECIPE,
    cuid
  };
}




export function fetchRecipes() {
  return (dispatch) => {
    return callApi('recipes').then(res => {
      dispatch(addRecipes(res.recipes));
    });
  };
}

export function fetchRecipe(cuid, token) {
  return (dispatch) => {
    return callApi(`recipes/${cuid}`, 'get', undefined, token).then(res => dispatch(addRecipe(res.recipe)));
  };
}

export function searchRecipes(url) {
  return (dispatch) => {
    return callApi(url).then(res => {
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

export function updateRecipeRequest(cuid, recipe) {
  return (dispatch) => {
    return callApi('recipes', 'put', { cuid, recipe }).then(res => {
      browserHistory.push('/created');
    });
  };
}

export function loveRecipeRequest(recipe) {
  return dispatch => {
    return callApi('interactions', 'post', { recipeCuid: recipe.cuid, actionType: 'love' }).then(res => {
      dispatch(loveRecipe(recipe));
    });
  };
}

export function unloveRecipeRequest(recipe) {
  return dispatch => {
    return callApi('interactions', 'delete', { recipeCuid: recipe.cuid, actionType: 'love' }).then(res => {
      dispatch(unloveRecipe(recipe));
    });
  };
}

export function favoriteRecipeRequest(recipe) {
  return dispatch => {
    return callApi('interactions', 'post', { recipeCuid: recipe.cuid, actionType: 'favorite' }).then(res => {
      dispatch(favoriteRecipe(recipe));
    });
  };
}

export function unfavoriteRecipeRequest(recipe) {
  return dispatch => {
    return callApi('interactions', 'delete', { recipeCuid: recipe.cuid, actionType: 'favorite' }).then(res => {
      dispatch(unfavoriteRecipe(recipe));
    });
  };
}

export function deleteRecipeRequest(recipe) {
  return dispatch => {
    return callApi('recipes', 'delete', { cuid: recipe.cuid }).then(res => {
      dispatch(deleteRecipe(recipe.cuid));
    });
  };
}


