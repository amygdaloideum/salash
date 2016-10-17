import { Router } from 'express';
import * as RecipeController from '../controllers/recipe.controller';

const router = new Router();

// Get all Posts
router.route('/recipes').get(RecipeController.getRecipes);

// Search posts by title
router.route('/recipes/search/:title').get(RecipeController.getRecipesByTitle);

// Get one post by cuid
router.route('/recipes/:cuid').get(RecipeController.getRecipe);

// Search posts by title
router.route('/recipes').post(RecipeController.addRecipe);

export default router;
