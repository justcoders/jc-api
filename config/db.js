const util = require('util');

const debug = require('debug')('jc-api:mongoose');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbUrl = `${process.env.MONGODB_HOST}/${process.env.RUN_ENV}_${process.env.MONGODB_DATABASE}`;
const connection = mongoose.connection;
mongoose.connect(dbUrl);

connection.on('connected',    () => console.log(`Mongoose connected to ${dbUrl}`) );
connection.on('error', (err) => {
  if(err instanceof Error) throw err;
  throw new Error(`Unable connect to database: ${dbUrl}`);
});
connection.on('disconnected', () => console.log(`Mongoose disconnected from ${dbUrl}`) );

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

