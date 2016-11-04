/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import recipes from './modules/Recipe/RecipeReducer';
import categories from './modules/Category/CategoryReducer';
import intl from './modules/Intl/IntlReducer';
import auth from './modules/Auth/AuthReducer';
import user from './modules/User/UserReducer';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form'

// Combine all reducers into one root reducer
export default combineReducers({
  routing,
  form,
  app,
  posts,
  recipes,
  categories,
  auth,
  intl,
  user
});
