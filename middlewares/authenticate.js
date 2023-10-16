const { HttpError } = require('../helpers/index');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpErrors(401, 'Not authorized'));
    return;
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpErrors(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch {
    next(HttpErrors(401, 'Not authorized'));
  }
};


module.exports = {
  authenticate,
};