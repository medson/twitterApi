const envPath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

require('dotenv').config({ path: envPath });

const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const settings = require('./config/settings');
const Raven = require('./app/services/sentry');

mongoose.connect(
  'mongodb://tester:test123@ds037087.mlab.com:37087/twitter_api_test',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);
requireDir(settings.modelspath);

app.use(bodyParser.json());

app.use(Raven.requestHandler());

app.use('/api', routes);

app.use(Raven.errorHandler());

app.listen(settings.port, () => { console.log(`Server is running on port ${settings.port}`); });

module.exports = app;
