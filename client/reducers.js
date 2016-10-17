/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import recipes from './modules/Recipe/RecipeReducer';
import intl from './modules/Intl/IntlReducer';
import { routerReducer as routing } from 'react-router-redux';
import { authStateReducer as auth } from 'redux-auth';

// Combine all reducers into one root reducer
export default combineReducers({
  routing,
  auth,
  app,
  posts,
  recipes,
  intl,
});
