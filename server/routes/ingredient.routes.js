import { Router } from 'express';
import * as IngredientController from '../controllers/ingredient.controller';

const router = new Router();

// Get all Posts
router.route('/ingredients').get(IngredientController.getIngredients);

// Search posts by title
router.route('/ingredients/:title').get(IngredientController.getIngredientsByTitle);

export default router;
