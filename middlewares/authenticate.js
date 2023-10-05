const { HttpError } = require('../helpers/index');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }
  //  may be not id but contactId
  try {
    const { contactId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(contactId);
    if (!user || !user.token) {
      return next(HttpError(401));
    }
    next();
  } catch (error) {
    next(HttpError(401));
  }
}

module.exports = {
  authenticate,
};