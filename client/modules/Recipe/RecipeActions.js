import callApi from '../../util/apiCaller';
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

export function searchRecipes(title) {
  return (dispatch) => {
    return callApi(`recipes/search/${title}`).then(res => {
      dispatch(addRecipes(res.recipes));
    });
  };
}

export function addRecipeRequest(recipe) {
  return (dispatch) => {
    return callApi('recipes', 'post', {
      recipe: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients.map(x => x._id),
        categories: recipe.categories.map(x => x._id)
      },
    });
  };
}
