require('dotenv').config();
const express = require('express');
const app = express();

app.set('package', require('./package.json'));

require('./config/db');
require('./app/middlewares')(app);
require('./app/routes')(app);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
