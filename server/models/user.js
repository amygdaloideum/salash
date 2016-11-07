import mongoose from 'mongoose';
import { hash, genSalt, compare} from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  username: {
    type: String
  },
  facebook: {
    id: { type: String },
    token: { type: String },
    email: { type: String },
    name: { type: String },
  }
}, { toJSON: { virtuals: true } });

userSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'author'
});

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', function(next) {
  const user = this, SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// generating a hash
userSchema.methods.generateHash = ( password, next ) => hash(password, genSaltSync(8), null, next);

// checking if password is valid
userSchema.methods.validPassword = function(password, next) {

  compare(password, this.password, next);

};


export default mongoose.model('User', userSchema);
