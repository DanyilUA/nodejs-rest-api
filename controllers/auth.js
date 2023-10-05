const { HttpError } = require('../helpers/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const {User} = require('../models/User');

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw HttpError(409, `${email} Email in use`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });

  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw HttpError(401, 'Email or password is wrong');
            };

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                throw HttpError(401, 'Email or password is wrong');
            }

            const payload = {id: user._id}

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
            await User.findByIdAndUpdate(user._id, { token });


            res.json({
                token,
                user: {
                email,
                subscription: user.subscription,
                },
            });
            
        } catch (error) {
            next(error);
        }
}
const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );

    res.json({
        email: user.email,
        subscription: user.subscription,
    });
};

    
const getCurrent = async (req, res, next) => {
    try {
        const { subscription, email } = req.user;
        res.json({
            email,
            subscription
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: '' });
    res.status(204).json();
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
  signup,
  signin,
  getCurrent,
  logout,
  updateSubscription,
};


