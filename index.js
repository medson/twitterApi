// const envPath = process.env.NODE_ENV
//   ? `.env.${process.env.NODE_ENV}`
//   : '.env';

// require('dotenv').config({ path: envPath });

require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const settings = require('./config/settings');
const Raven = require('./app/services/sentry');

mongoose.connect(
  settings.db,
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
