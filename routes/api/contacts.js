const express = require('express')

const router = express.Router()
const contactsController = require("../../controllers/contact");
const { isEmptyBody, isValidId } = require('../../middlewares/index');
const { validationBody, contactUpdateFavorite } = require('../../models/Contact');


router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContact);

router.post('/',validationBody, contactsController.createContact);

router.put('/:contactId', isValidId, isEmptyBody, validationBody, contactsController.updateContactById);

router.patch('/:contactId/favorite',isValidId, isEmptyBody, contactUpdateFavorite, contactsController.updateStatusContact);

router.delete('/:contactId', isValidId, contactsController.deleteContact);

module.exports = router

// 652148a9c1f700a75642e3d0