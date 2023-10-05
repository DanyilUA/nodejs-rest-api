const express = require('express')

const authController = require('../../controllers/auth');

const { isEmptyBody, authenticate, upload, isEmptyAvatar, isValidEmail } = require('../../middlewares/index');
const { validationBodySignIn, validationBodySignUp, validateSubscription, validationEmail } = require('../../models/User');

const authRouter = express.Router();

authRouter.get('/verify/:verificationToken', authController.verifyEmail);
authRouter.post('/verify', isValidEmail, validationEmail, authController.resendVerifyEmail)


authRouter.post('/register', isEmptyBody, validationBodySignUp, authController.signup);
authRouter.post('/login', isEmptyBody, validationBodySignIn, authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.logout);
authRouter.patch('/', authenticate, validateSubscription, authController.updateSubscription);
authRouter.patch('/avatars', authenticate, upload.single('avatar'), isEmptyAvatar, authController.updateAvatar);



module.exports = authRouter; 