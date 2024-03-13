const EventosCumpleaños = require('../EventosCumpleaños');

// Crear una instancia de la clase EventosCumpleaños
const calendario = new EventosCumpleaños();

// Ejemplo de uso con el día de hoy
const fechaDeHoy = new Date();
calendario.listarEventosPorFecha(fechaDeHoy);

// Ejemplo de uso con el día de mañana
const fechaDeMañana = new Date();
fechaDeMañana.setDate(fechaDeMañana.getDate() + 1);
calendario.listarEventosPorFecha(fechaDeMañana);

const fechaEspecifica = new Date(2024, 0, 10); // El mes se indexa desde 0, por lo que marzo es el mes 2
calendario.listarEventosPorFecha(fechaEspecifica);

