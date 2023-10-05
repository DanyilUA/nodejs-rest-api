const User = require('../models/User');
const { HttpError } = require('../helpers/index');

const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
        res.status(201).json({
        username: user.username,
        email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};


