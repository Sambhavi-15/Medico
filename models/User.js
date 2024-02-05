// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['patient', 'doctor'],
    required: true
  },
  speciality: {
    type: String,
    required: function () {
      return this.userType === 'doctor';
    }
  },
  time: {
    type: [String], // Assuming time is represented as an array of strings
    default: [],
    required: function () {
      return this.userType === 'doctor';
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
