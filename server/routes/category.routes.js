import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';

const router = new Router();

// Get all Posts
router.route('/categories').get(CategoryController.getCategories);

// Search posts by title
router.route('/categories/:title').get(CategoryController.getCategoriesByTitle);

export default router;
