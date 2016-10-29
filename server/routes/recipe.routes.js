import { Router } from 'express';
import * as RecipeController from '../controllers/recipe.controller';
import { isAuthenticated } from '../util/authMiddleware'

const router = new Router();

// Get all Posts
router.route('/recipes').get(RecipeController.getRecipes);

// Search posts by title
router.route('/recipes/search/:title').get(RecipeController.getRecipesByTitle);

router.route('/recipes/search/').get(RecipeController.searchRecipes);

// Get one post by cuid
router.route('/recipes/:cuid').get(RecipeController.getRecipe);

// Search posts by title
router.route('/recipes').post(isAuthenticated, RecipeController.addRecipe);

export default router;
