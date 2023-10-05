const { HttpError } = require('../helpers/index');
const Joi = require('joi');

const contactsService = require('../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.number().required().messages({
    'any.required': `"phone" is a required field`,
  }),
});

const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'All fields are empty');
    }

    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'All fields are empty');
    }

    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(400, error.message);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(400, error.message);
    }
    res.json({
      message: 'Dete success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteContact,
  updateContactById,
  createContact,
  getContact,
  getAllContacts,
};