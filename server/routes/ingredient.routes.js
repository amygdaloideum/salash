import { Router } from 'express';
import * as IngredientController from '../controllers/ingredient.controller';

const router = new Router();

// Get all Posts
router.route('/ingredients').get(IngredientController.getIngredients);

export default router;
