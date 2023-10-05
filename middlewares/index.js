const { isEmptyBody } = require('./isEmptyBody');
const { isValidId } = require('./isValidId');
const { isEmptFieldFavorite } = require('./isEmptyFieldFavorite')
const { authenticate } = require('./authenticate');
const { validationBody } = require('./validationBody');
const { upload } = require('./upload');
const { isEmptyAvatar } = require('./isEmptyAvatar');
const { isValidEmail } = require('./isValidEmail');

module.exports = {
  isEmptyBody,
  isValidId,
  isEmptFieldFavorite,
  authenticate,
  validationBody,
  isEmptyAvatar,
  upload,
  isValidEmail,
};
