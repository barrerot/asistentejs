const EventosCalendario = require('./EventosCalendario');
const EventosCumpleaños = require('./EventosCumpleaños');

// Crear una instancia de la clase EventosCalendario y EventosCumpleaños
const calendarioEventos = new EventosCalendario(process.env.CALENDAR_ID_EVENTOS);
const calendarioCumpleanos = new EventosCumpleaños(process.env.CALENDAR_ID_CUMPLEANOS);

// Ejemplo de uso con el día de hoy
const fechaDeHoy = new Date();
calendarioEventos.listarEventosPorFecha(fechaDeHoy);
calendarioCumpleanos.listarEventosPorFecha(fechaDeHoy);

// Ejemplo de uso con el día de mañana
const fechaDeMañana = new Date();
fechaDeMañana.setDate(fechaDeMañana.getDate() + 1);
calendarioEventos.listarEventosPorFecha(fechaDeMañana);
calendarioCumpleanos.listarEventosPorFecha(fechaDeMañana);

// Ejemplo de uso con una fecha específica
const fechaEspecifica = new Date(2024, 2, 20); // El mes se indexa desde 0, por lo que marzo es el mes 2
calendarioEventos.listarEventosPorFecha(fechaEspecifica);
calendarioCumpleanos.listarEventosPorFecha(fechaEspecifica);
