import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller'; 
import passport from 'passport';

const router = new Router();

router.route('/auth/facebook').get(passport.authenticate('facebook', { display: 'popup' }));

router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {session: false, failureRedirect : '/login'}), (req, res) => {
 var token = req.user.token;
 return res.redirect(`/auth/facebook/callback?token=${token}`);
});

router.route('/auth/unwraptoken').get(AuthController.unwrapToken);

export default router;
