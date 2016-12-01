// Import Actions
import {
  ADD_RECIPES,
  ADD_RECIPE,
  LOVE_RECIPE,
  UNLOVE_RECIPE,
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE
} from './RecipeActions';

// Initial State
const initialState = { data: [] };

const cloneObj = obj => JSON.parse(JSON.stringify(obj));

const interactWithRecipe = (recipes, recipe, interaction, value) => {
  const clone = cloneObj(recipes.find(e => e.cuid == recipe.cuid));
  clone.interactions[interaction] = value;
  return [...recipes].map(r => r.cuid == recipe.cuid ? clone : r)
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_RECIPE:
      return {
        data: [action.recipe, ...state.data],
      };

    case ADD_RECIPES:
      return {
        data: action.recipes,
      };

    case LOVE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'love', true),
      };

    case UNLOVE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'love', null),
      };

    case FAVORITE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'favorite', true),
      };

    case UNFAVORITE_RECIPE:
      return {
        data: interactWithRecipe(state.data, action.recipe, 'favorite', null),
      };

    default:
      return state;
  }
};

export const getRecipes = state => state.recipes.data;

export const getRecipe = (state, cuid) => state.recipes.data.filter(recipe => recipe.cuid === cuid)[0];

export default RecipeReducer;
