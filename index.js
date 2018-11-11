const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const settings = require('./config/settings');

mongoose.connect(
  settings.db,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);
requireDir(settings.modelspath);

app.listen(settings.port, () => { console.log(`Server is running on port ${settings.port}`); });
