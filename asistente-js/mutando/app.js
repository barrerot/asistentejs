require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const eventosRouter = require('./routes/api/eventos');
const cumpleanosRouter = require('./routes/api/cumpleanos');

const app = express();

// Configuración de middleware y otras configuraciones...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pasa los IDs de los calendarios a las rutas correspondientes
app.use('/api/eventos', eventosRouter(process.env.EVENTOS_CALENDAR_ID));
app.use('/api/cumpleanos', cumpleanosRouter(process.env.CUMPLEANOS_CALENDAR_ID));

// Middleware para manejar errores...
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor.' });
});

module.exports = app;
