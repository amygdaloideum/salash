import cookies from 'cookies';
import jwt from 'jsonwebtoken'
import config from '../config/config';

export function getInitialState(req, res) {
  let token = new cookies(req, res).get('token');
  let user;
  try {
    user = jwt.verify(token, config.secret);
  } catch (err) { }

  return user && token ? { auth: { token, user } } : {};
}

export function isAuthenticated(req, res) {
  let token = new cookies(req, res).get('token');
  let user;
  try {
    user = jwt.verify(token, config.secret);
  } catch (err) { }

  return !!user;
}