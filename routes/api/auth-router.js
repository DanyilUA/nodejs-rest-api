const express = require('express')

const authController = require('../../controllers/auth');

const { isEmptyBody, authenticate } = require('../../middlewares/index');
const { validationBodySignIn, validationBodySignUp } = require('../../models/User');

const authRouter = express.Router();

authRouter.post('/users/register', isEmptyBody, validationBodySignUp, authController.signup);
authRouter.post('/users/login', isEmptyBody, validationBodySignIn, authController.signin);
authRouter.get('/users/current', authenticate, authController.getCurrent);
authRouter.post('/users/logout', authenticate, authController.logout);



module.exports = authRouter; 