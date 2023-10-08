const express = require('express')

const router = express.Router()
const contactsController = require("../../controllers/contact");
const { isEmptyBody } = require('../../middlewares/index');
const { validationBody } = require('../../models/Contact');
const { isValidId } = require('../../middlewares/index');

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContact);

router.post('/', isEmptyBody, validationBody, contactsController.createContact);

router.put('/:contactId', isValidId, isEmptyBody, validationBody, contactsController.updateContactById);

// router.delete('/:contactId', isValidId, contactsController.deleteContact);

module.exports = router

// 652148a9c1f700a75642e3d0