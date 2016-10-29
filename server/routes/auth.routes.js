import { Router } from 'express';
import User from '../models/user';
import { isAuthenticated } from '../util/authMiddleware';
import jwt from 'jsonwebtoken';

const router = new Router();

router.route('/setup').get((req, res) => {
  var nick = new User({
    name: 'Nick Cerminara',
    email: 'test@test.se',
    admin: true
  });

  nick.generateHash('password', (err, hash) => {
    if(err) {
      return done(err);
    }

    nick.password = hash;

    nick.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.json({ success: true });
    });
  });
});

router.route('/authenticate').post((req, res) => {});

export default router;
