// Import Actions
import {
  ADD_RECIPES,
  ADD_RECIPE,
  LOVE_RECIPE,
  UNLOVE_RECIPE,
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
  DELETE_RECIPE
} from './RecipeActions';

// Initial State
const initialState = { data: [] };

const cloneObj = obj => JSON.parse(JSON.stringify(obj));

const interactWithRecipe = (recipes, recipe, interaction, value) => {
  const clone = cloneObj(recipes.find(e => e.cuid == recipe.cuid));
  clone.interactions[interaction] = value;
  return [...recipes].map(r => r.cuid == recipe.cuid ? clone : r);
};

const removeRecipeFromList = (recipes, cuid) => {
  const index = recipes.findIndex(r => r.cuid === cuid);
  return [
    ...recipes.slice(0, index),
    ...recipes.slice(index + 1)
  ];
}

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_RECIPE:
      return {
        data: [action.recipe, ...state.data]
      };

    case ADD_RECIPES:
      return {
        data: action.recipes
      };

    case LOVE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'love', true)
      };

    case UNLOVE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'love', null)
      };

    case FAVORITE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'favorite', true)
      };

    case UNFAVORITE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'favorite', null)
      };

    case DELETE_RECIPE:
      return {
        data: removeRecipeFromList(state.data, action.cuid)
      };

    default:
      return state;
  }
};

export const getRecipes = state => state.recipes.data;

export const getRecipe = (state, cuid) => {
  return state.recipes.data.filter(recipe => recipe ? recipe.cuid === cuid : false)[0]
};

export default RecipeReducer;
