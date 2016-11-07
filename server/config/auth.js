import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config'

export const profiles = {
  'facebookAuth': {
    'clientID': '1005914192867598', // your App ID
    'clientSecret': 'a308aec901f2a0317b261e62844a8083', // your App Secret
    'callbackURL': 'http://localhost:8000/api/auth/facebook/callback'
  }
};

const signToken = (user, secret) => jwt.sign({ username: user.facebook.name, _id: user._id}, config.secret, { expiresIn: '24h' });

export function getFacebookStrategy() {
  return new FacebookStrategy(profiles.facebookAuth, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {

        if (user) {
          const token = signToken(user, config.secret);
          return done(null, {user, token});
        }

        const newUser = new User();
        newUser.facebook.id = profile.id;                  
        newUser.facebook.token = accessToken;              
        newUser.facebook.name = profile.displayName;


        newUser.save((err, saved) => {
          console.log(saved);
          if(err){ throw err; }
          const token = signToken(saved, config.secret);          
          return done(null, {user: saved, token});
        });
      });
    });
  })
}