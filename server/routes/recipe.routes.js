import { Router } from 'express';
import * as RecipeController from '../controllers/recipe.controller';
import { isAuthenticated, getUserFromToken } from '../util/authMiddleware'
import { getSession } from '../util/dbUtils';

const router = new Router();

router.route('/recipes/search/').get(getUserFromToken, RecipeController.searchRecipes);

router.route('/recipes/:cuid').get(getUserFromToken, RecipeController.getRecipe);

router.route('/recipes').post(isAuthenticated, RecipeController.addRecipe);

router.route('/recipes').put(isAuthenticated, RecipeController.updateRecipe);

router.route('/recipes').delete(isAuthenticated, RecipeController.deleteRecipe);

export default router;
