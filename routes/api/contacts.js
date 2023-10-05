const express = require('express')

const router = express.Router()
const contactsController = require("../../controllers/contact");
const { isEmptyBody, authenticate, isValidId, isEmptFieldFavorite } = require('../../middlewares/index');
const { validationBody, contactUpdateFavorite } = require('../../models/Contact');

// router.use(authenticate);

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContact);

router.post('/',validationBody, contactsController.createContact);

router.put('/:contactId', isValidId, isEmptyBody, validationBody, contactsController.updateContactById);

router.patch('/:contactId/favorite',isValidId, isEmptFieldFavorite, contactUpdateFavorite, contactsController.updateStatusContact);

router.delete('/:contactId', isValidId, contactsController.deleteContact);

module.exports = router

