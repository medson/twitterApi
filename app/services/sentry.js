const Raven = require('raven');
const settings = require('../../config/settings');

const ravenClient = Raven.config(settings.sentryDSN).install();

module.exports = ravenClient;
