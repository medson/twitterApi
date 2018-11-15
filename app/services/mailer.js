const nodemailer = require('nodemailer');
const { mailConfig } = require('../../config/settings');

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

module.exports = options => transport.sendMail(options);
