const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const settings = require('./config/settings');

mongoose.connect(
  settings.db,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);
requireDir(settings.modelspath);

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(settings.port, () => { console.log(`Server is running on port ${settings.port}`); });
