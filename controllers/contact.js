const { HttpError } = require('../helpers/index');
const contactsService = require('../models/contacts');


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
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {

    const { contactId } = req.params;

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: 'contact deleted',
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