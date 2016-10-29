import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_CATEGORIES = 'ADD_CATEGORIES';

// Export Actions
export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export function fetchCategories() {
  return (dispatch) => {
    return callApi('categories').then(res => {
      dispatch(addCategories(res.categories));
    });
  };
}