import { Strategy as FacebookStrategy } from 'passport-facebook';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import { getSession } from '../util/dbUtils';
import cuid from 'cuid';

export const profiles = {
  'facebookAuth': {
    'clientID': '1005914192867598', // your App ID
    'clientSecret': 'a308aec901f2a0317b261e62844a8083', // your App Secret
    'callbackURL': 'http://localhost:8000/api/auth/facebook/callback'
  }
};

const signToken = (user, secret) => jwt.sign(user, config.secret, { expiresIn: '24h' });

export function getFacebookStrategy() {
  return new FacebookStrategy(profiles.facebookAuth, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {

      getSession({}).run(`
        MERGE (u:User {facebookId: "${profile.id}"})
        ON CREATE SET u.cuid = "${cuid()}"        
        ON CREATE SET u.facebookName = "${profile.displayName}"
        ON CREATE SET u.facebookToken = "${accessToken}"
        ON CREATE SET u.username = "${profile.displayName}"
        RETURN u
      `).then( response => {
        const user = response.records[0].get('u').properties;
        const token = signToken(user, config.secret);          
        return done(null, {user, token});
      });

    });
  })
}