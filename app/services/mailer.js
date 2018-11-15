const nodemailer = require('nodemailer');
const fs = require('fs');
const hbs = require('handlebars');
const path = require('path');
const htmlToText = require('html-to-text');

const { mailConfig, templatesPath } = require('../../config/settings');

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

module.exports = ({ template, context, ...options }) => {
  /**
   * Mail template
   */

  let hbsTemplate;
  if (template) {
    const file = fs.readFileSync(path.join(templatesPath, `${template}.hbs`), 'utf8');
    hbsTemplate = hbs.compile(file)(context);
  }

  const mailHtml = hbsTemplate || options.html;

  return transport.sendMail({
    ...options,
    html: mailHtml,
    text: htmlToText.fromString(mailHtml).trim(),
  });
};
