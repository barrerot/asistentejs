const EventosCumpleaños = require('../EventosCumpleaños');

// Crear una instancia de la clase EventosCumpleaños
const cumpleaños = new EventosCumpleaños();

// Crear una fecha para el 10 de diciembre
const fechaCumpleaños = new Date('2024-12-10');

// Listar eventos de cumpleaños para el 10 de diciembre
cumpleaños.listarEventosPorFecha(fechaCumpleaños);
