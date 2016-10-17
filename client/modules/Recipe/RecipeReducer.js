// Import Actions
import { ADD_RECIPES, ADD_RECIPE } from './RecipeActions';

// Initial State
const initialState = { data: [] };

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_RECIPE :
      return {
        data: [action.recipe, ...state.data],
      };

    case ADD_RECIPES :
      return {
        data: action.recipes,
      };

    default:
      return state;
  }
};

export const getRecipes = state => state.recipes.data;

export const getRecipe = (state, cuid) => state.recipes.data.filter(recipe => recipe.cuid === cuid)[0];

export default RecipeReducer;
