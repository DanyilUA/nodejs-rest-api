const express = require('express')

const authController = require('../../controllers/auth');

const { isEmptyBody } = require('../../middlewares/index');
const { validationBodySignIn, validationBodySignUp } = require('../../models/User');

const authRouter = express.Router();

authRouter.post('/users/register', isEmptyBody, validationBodySignUp, authController.signup);
authRouter.post('/users/login', isEmptyBody, validationBodySignIn, authController.signin);



module.exports = authRouter; 