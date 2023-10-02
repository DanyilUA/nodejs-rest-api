const express = require('express')

const router = express.Router()
const { HttpError } = require('../../helpers/index');
const Joi = require('joi');

const contactsService = require('../../models/contacts');


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


router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    
  } catch (error) {
        next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
      
    } catch (error) {
          next(error);
    }
});

module.exports = router
