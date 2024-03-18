const express = require('express');
const EventosCalendario = require('./models/eventosCalendario'); // Requiere el modelo eventosCalendario desde el directorio models
const EventosCumpleaños = require('./models/eventosCumpleaños'); // Requiere el modelo eventosCumpleaños desde el directorio models

const app = express();

// Crear instancias de los modelos
const eventosCalendario = new EventosCalendario();
const eventosCumpleaños = new EventosCumpleaños();

// Ruta para listar eventos del calendario
app.get('/eventos/:fecha', async (req, res) => {
  try {
    console.log('Solicitud recibida para listar eventos del calendario');
    const fecha = new Date(req.params.fecha);
    console.log('Fecha recibida:', fecha);
    const eventos = await eventosCalendario.listarEventosPorFecha(fecha);
    console.log('Eventos obtenidos:', eventos);
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos del calendario:', error);
    res.status(500).json({ error: 'Error al obtener eventos del calendario' });
  }
});

// Ruta para listar eventos de cumpleaños
app.get('/cumpleanos/:fecha', async (req, res) => {
  try {
    console.log('Solicitud recibida para listar eventos de cumpleaños');
    const fecha = new Date(req.params.fecha);
    console.log('Fecha recibida:', fecha);
    const eventos = await eventosCumpleaños.listarEventosPorFecha(fecha);
    console.log('Eventos obtenidos:', eventos);
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos de cumpleaños:', error);
    res.status(500).json({ error: 'Error al obtener eventos de cumpleaños' });
  }
});

// Escuchar en un puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
