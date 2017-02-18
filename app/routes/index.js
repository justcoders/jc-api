module.exports = (app) => {
  "use strict";

  app.get('/', (req, res) => {
    res.send({
      version: app.get('package').version,
      env: process.env.NODE_ENV
    });
  });

  app.use('/account', require('./account'));

};