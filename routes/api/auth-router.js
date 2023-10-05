const express = require('express')

const authController = require('../../controllers/auth');

const { isEmptyBody, authenticate } = require('../../middlewares/index');
const { validationBodySignIn, validationBodySignUp, validateSubscription } = require('../../models/User');

const authRouter = express.Router();

// authRouter.post('/register', isEmptyBody, validationBodySignUp, authController.signup);
authRouter.post('/register', authController.signup);

authRouter.post('/login', isEmptyBody, validationBodySignIn, authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.logout);
authRouter.patch('/', authenticate, validateSubscription, authController.updateSubscription);


module.exports = authRouter; 