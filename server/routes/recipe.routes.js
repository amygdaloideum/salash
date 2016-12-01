import { Router } from 'express';
import * as RecipeController from '../controllers/recipe.controller';
import { isAuthenticated, getUserFromToken } from '../util/authMiddleware'
import { getSession } from '../util/dbUtils';

const router = new Router();

router.route('/recipes/search/').get(getUserFromToken, RecipeController.searchRecipes);

// Get one post by cuid
router.route('/recipes/:cuid').get(getUserFromToken, RecipeController.getRecipe);

// Search posts by title
router.route('/recipes').post(isAuthenticated, RecipeController.addRecipe);

export default router;
