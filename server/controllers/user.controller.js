import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config'

const getUserToSign = ({_id, email, username, recipes}) => ({_id, email, username, recipes});

export function getUser(req, res) {
  User.findById(req.params.id).populate('recipes').exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

export function validateUser(req, res) {
  const findUserCallback = (err, user) => {
    if (err){ throw err; }

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      user.validPassword(req.body.password, (err, isValid) => {
        if(!isValid){
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          const formattedUser = getUserToSign(user);
          var token = jwt.sign(formattedUser, config.secret, {
            expiresIn: '24h' // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Authentication succeeded.',
            user: formattedUser,
            token: token
          });
        }
      });
    }
  }
  User.findOne({ email: req.body.email }).select('+password').exec(findUserCallback);
}

export function signupUser(req, res) {
  const user = req.body.user;

  if(!user){
    res.status(403).end();
  }

  if (!user.email) { // Return error if no email provided
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  if (!user.username) { // Return error if full name not provided
    return res.status(422).send({ error: 'You must enter a username'});
  }

  if (!user.password) { // Return error if no password provided
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: user.email}, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    let newUser = new User(req.body.user);
    newUser.save((err, saved) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.json({ user: saved });
    });

  });
}
