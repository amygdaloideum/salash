import jwt from 'jsonwebtoken';
import config from '../config/config'
import cookies from 'cookies';

export function isAuthenticated  (req, res, next){
  // check header or url parameters or post parameters for token
  const token = new cookies(req, res).get('token') || req.headers.authorization;
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}

export function getUserFromToken  (req, res, next){
  // check header or url parameters or post parameters for token
  const token = new cookies(req, res).get('token') || req.headers.authorization;
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        next();
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
}
