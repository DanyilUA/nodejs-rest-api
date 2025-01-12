const { Schema, model } = require('mongoose');
const { handleSaveError, runValidatorsAtUpdate } = require('./hooks');
const { HttpError } = require('../helpers/index');
const Joi = require('joi');


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactSchemaJoi = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
  favorite: Joi.boolean(),
});

const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validationBody = (req, res, next) => {
  const { error } = contactSchemaJoi.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};

const contactUpdateFavorite = (req, res, next) => {
  const { error } = contactFavoriteSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
}


contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

module.exports = {
  contactUpdateFavorite,
  validationBody,
  Contact,
};