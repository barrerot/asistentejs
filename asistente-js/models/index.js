module.exports = {
  mongoose: require('mongoose'),
  connectMongoose: require('../lib/connectDB'),
  Cumpleaños: require('./Cumpleaños'),
  Evento: require('./Evento'),
}