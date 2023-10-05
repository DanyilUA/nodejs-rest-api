const { HttpError } = require('../helpers/index');
const {Contact} = require('../models/Contact');

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // const { page = 1, limit = 20 } = req.query;
    // const skip = (page -1) * limit;
    // const result = await Contact.find({ owner }, { skip, limit });
    const result = await Contact.find({ owner }).populate("owner", "subscription email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({_id: contactId, owner});
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
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findOneAndDelete({_id: contactId, owner});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteContact,
  updateStatusContact,
  updateContactById,
  createContact,
  getContact,
  getAllContacts,
};
