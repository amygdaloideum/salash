// Import Actions
import { ADD_CATEGORIES } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES :
      return {
        data: action.categories
      };

    default:
      return state;
  }
};

export default CategoryReducer;


export const getCategories = state => state.categories.data;