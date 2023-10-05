const nodemailer = require('nodemailer');
require('dotenv').config();
const { PASSWORD_REAL } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'danyilkonotop@ukr.net',
    pass: PASSWORD_REAL,
  },
});

const sendEmail = async (data) => {
    await transporter.sendMail({ ...data, from: 'danyilkonotop@ukr.net' });
};

module.exports = {
    sendEmail,
};