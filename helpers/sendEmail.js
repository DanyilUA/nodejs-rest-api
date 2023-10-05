const nodemailer = require('nodemailer');
require('dotenv').config();
const { PASSWORD_REAL } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'danyilkonotop@mail.ru',
    pass: PASSWORD_REAL,
  },
});

const sendEmail = async (data) => {
  await transporter.sendMail({ ...data, from: 'danyilkonotop@mail.ru' });
};

module.exports = {sendEmail};