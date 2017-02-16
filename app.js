const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
  res.send({
    version: packageInfo.version
  });
});

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
