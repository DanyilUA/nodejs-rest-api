const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const { handleSaveError, runValidatorsAtUpdate } = require('./hooks');
const { HttpError } = require('../helpers/index');

const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

const userSignUpSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing required password field',
  }),
});

const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model('user', userSchema);

const validationBodySignIn = (req, res, next) => {
  const { error } = userSignInSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};

const validationBodySignUp = (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};

module.exports = {
  User,
  validationBodySignIn,
  validationBodySignUp,
};
