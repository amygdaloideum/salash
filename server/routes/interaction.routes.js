import { Router } from 'express';
import { isAuthenticated } from '../util/authMiddleware'
import * as interactionController from '../controllers/interaction.controller'; 

const router = new Router();

router.route('/interactions').post(isAuthenticated, interactionController.createInteraction);

router.route('/interactions').delete(isAuthenticated, interactionController.deleteInteraction);

export default router;
