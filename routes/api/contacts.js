const express = require('express')

const router = express.Router()
const contactsController = require("../../controllers/contact");
const { isEmptyBody } = require('../../middlewares/index');
const { validationBody } = require('../../middlewares/index');

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', contactsController.getContact);

router.post('/', isEmptyBody, validationBody, contactsController.createContact);

router.put('/:contactId', isEmptyBody, validationBody, contactsController.updateContactById);

router.delete('/:contactId', contactsController.deleteContact);

module.exports = router
