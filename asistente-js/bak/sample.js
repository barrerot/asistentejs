const EventosCalendario = require('../EventosCalendario');
const EventosCumpleaños = require('../EventosCumpleaños');

const calendarioEventos = new EventosCalendario(process.env.CALENDAR_ID_EVENTOS);
const calendarioCumpleanos = new EventosCumpleaños(process.env.CALENDAR_ID_CUMPLEANOS);

// Utiliza las instancias para listar eventos por fecha
calendarioEventos.listarEventosPorFecha(new Date());
calendarioCumpleanos.listarEventosPorFecha(new Date());
