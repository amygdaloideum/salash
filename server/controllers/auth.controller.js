import jwt from 'jsonwebtoken';
import config from '../config/config'
import cookies from 'cookies';

export function unwrapToken(req, res) {
  const token = new cookies(req, res).get('token');
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        res.json(decoded);
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
