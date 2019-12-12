const mongoose = require('mongoose');
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

const User = mongoose.model('User', userSchema);
module.exports = User;