const { HttpError } = require('../helpers/index');

const isValidEmail = (req, res, next) => {
  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) {
    next(HttpError(400, 'missing required field email'));
  }
  next();
};

module.exports = {isValidEmail};
