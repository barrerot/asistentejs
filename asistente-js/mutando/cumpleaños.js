const express = require('express');
const router = express.Router();
const EventosCumpleaños = require('../../EventosCumpleaños');

module.exports = function(calendarId) {
  // Ruta para obtener cumpleaños por día
  router.get('/', async (req, res, next) => {
    try {
      const { day, month, year } = req.body;
      const fecha = new Date(year, month - 1, day); // Resta 1 al mes porque JavaScript indexa los meses desde 0
      const calendarioCumpleanos = new EventosCumpleaños(calendarId);
      await calendarioCumpleanos.listarEventosPorFecha(fecha);
      res.json({ success: true, message: 'Cumpleaños obtenidos correctamente.' });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
