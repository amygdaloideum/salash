import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.route('/users/authenticate').post(UserController.validateUser);

router.route('/users/signup').post(UserController.signupUser);

export default router;
