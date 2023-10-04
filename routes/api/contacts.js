const express = require('express')

const router = express.Router()
const contactsController = require("../../controllers/contact-controller");
const { isEmptyBody } = require('../../middlewares/index');


router.get('/', contactsController.getAllContacts);

router.get('/:contactId', contactsController.getContact);

router.post('/', isEmptyBody ,contactsController.createContact);

router.put('/:contactId', isEmptyBody, contactsController.updateContactById);

router.delete('/:contactId', contactsController.deleteContact);

module.exports = router
