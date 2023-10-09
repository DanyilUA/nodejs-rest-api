const { HttpError } = require("../helpers/index");

const isEmptFieldFavorite = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return next(HttpError(400, 'missing field favorite'));
    }
  next();
}


module.exports = {
  isEmptFieldFavorite,
};