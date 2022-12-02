const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your first name'],
    maxLength: [8, 'First Name should not exceed 8 characters'],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your last name'],
    maxLength: [8, 'Last Name should not exceed 8 characters'],
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password should contain atleast 8 characters'],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (canditatePass) {
  return await bcrypt.compare(canditatePass, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
