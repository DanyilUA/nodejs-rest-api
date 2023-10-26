const {HttpError} = require('../helpers/index')

const isEmptyAvatar = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, `field "avatar" cannot be empty`));
  }
  next();
};

module.exports = {
    isEmptyAvatar
};
