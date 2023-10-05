const { handleSaveError, runValidatorsAtUpdate } = require('./hooks');
const { HttpError } = require('../helpers/index');
const { Schema, model } = require('mongoose');

const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionType = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
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
    subscription: {
      type: String,
      enum: subscriptionType,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

const userSignUpSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': 'missing required password field',
  }),
  subscription: Joi.string().valid(...subscriptionType),
});

const userSignInSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required password field',
  }),
});

const userSubscriptionSchema = Joi.object({
    subscription: Joi.string()
    .valid(...subscriptionType)
    .required()
    .messages({ 'any.required': 'missing required "subscription" field' }),
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

const validateSubscription = (req, res, next) => {
      const { error } = userSubscriptionSchema.validate(req.body);
    if (error) {
        return next(HttpError(400, error.message));
    }
    next();
}

module.exports = {
    validationBodySignIn,
    validationBodySignUp,
    validateSubscription,
    User,
};
