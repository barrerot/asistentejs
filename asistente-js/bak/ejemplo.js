const EventosCalendario = require('../EventosCalendario');

// Crear una instancia de la clase EventosCalendario
const calendario = new EventosCalendario();

// Ejemplo de uso con el día de hoy
const fechaDeHoy = new Date();
calendario.listarEventosPorFecha(fechaDeHoy);

// Ejemplo de uso con el día de mañana
const fechaDeMañana = new Date();
fechaDeMañana.setDate(fechaDeMañana.getDate() + 1);
calendario.listarEventosPorFecha(fechaDeMañana);

const fechaEspecifica = new Date(2024, 2, 20); // El mes se indexa desde 0, por lo que marzo es el mes 2
calendario.listarEventosPorFecha(fechaEspecifica);

