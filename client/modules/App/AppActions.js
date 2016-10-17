// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_RECIPE = 'TOGGLE_ADD_RECIPE';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddRecipe() {
  return {
    type: TOGGLE_ADD_RECIPE,
  };
}
