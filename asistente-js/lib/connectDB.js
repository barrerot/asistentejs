'use strict';

const mongoose = require('mongoose');

const connectionPromise = mongoose.connect('mongodb://127.0.0.1/asistente-js');

connectionPromise.then(() => {
  console.info('Connected to mongodb.');
  console.info('Database name:', mongoose.connection.db.databaseName);
}).catch(err => {
  console.error('Error connecting to database:', err);
  process.exit(1);
});

mongoose.connection.on('error', function (err) {
  console.error('mongodb connection error:', err);
  process.exit(1);
});
