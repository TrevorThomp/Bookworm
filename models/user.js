const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  }, 
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  }
})
// hash password before saving to database
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err,hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})
const User = mongoose.model('User', userSchema);
module.exports = User;
