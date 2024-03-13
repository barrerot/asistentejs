const express = require('express');
const router = express.Router();
const EventosCalendario = require('../../EventosCalendario');

module.exports = function(calendarId) {
  // Ruta para obtener eventos por día
  router.get('/', async (req, res, next) => {
    try {
      const { day, month, year } = req.body;
      const fecha = new Date(year, month - 1, day); // Resta 1 al mes porque JavaScript indexa los meses desde 0
      const calendarioEventos = new EventosCalendario(calendarId);
      await calendarioEventos.listarEventosPorFecha(fecha);
      res.json({ success: true, message: 'Eventos obtenidos correctamente.' });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
