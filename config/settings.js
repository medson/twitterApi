const path = require('path');
require('dotenv').config();

module.exports = {
  db: process.env.DB_HOST,
  port: process.env.PORT,
  modelspath: path.resolve('app', 'models'),
  authSecret: process.env.SECRET_KEY,
  sentryDSN: process.env.SENTRY_DSN_KEY,
  mailConfig: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
