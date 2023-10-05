const { HttpError } = require('../helpers/index');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  phone: Joi.number().required().messages({
    'any.required': `missing required phone field`,
  }),
});

const validationBody = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return  next(HttpError(400, error.message));
    }
    next();
}

module.exports = {
  validationBody,
};