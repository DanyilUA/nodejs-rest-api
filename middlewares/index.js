const { isEmptyBody } = require('./isEmptyBody');
const { isValidId } = require('./isValidId');
const { isEmptFieldFavorite } = require('./isEmptyFieldFavorite')
const { authenticate } = require('./authenticate');
const {validationBody} = require('./validationBody')

module.exports = {
  isEmptyBody,
  isValidId,
  isEmptFieldFavorite,
  authenticate,
  validationBody,
};
