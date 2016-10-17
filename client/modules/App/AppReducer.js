// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_RECIPE } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddRecipe: false
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

      case TOGGLE_ADD_RECIPE:
        return {
          showAddRecipe: !state.showAddRecipe,
        };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

export const getShowAddRecipe = state => state.app.showAddRecipe;

// Export Reducer
export default AppReducer;
