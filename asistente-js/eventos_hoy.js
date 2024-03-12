const { google } = require('googleapis');
const key = require('./credentials.json'); // Importa tu archivo JSON de credenciales del servicio

// Define el ámbito para la API del calendario
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Crea un nuevo cliente JWT utilizando el archivo de clave
const auth = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: SCOPES,
});

// Configura la API de Google Calendar con el cliente autenticado
const calendar = google.calendar({ version: 'v3', auth });

// Ejemplo: Listar los eventos del calendario del usuario para hoy con resumen y fechas
async function listarEventosHoy() {
  try {
    const ahora = new Date();
    const inicioDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 0, 0, 0);
    const timeMin = inicioDelDia.toISOString();
    const finDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 23, 59, 59);
    const timeMax = finDelDia.toISOString();

    const respuesta = await calendar.events.list({
      calendarId: '43ab978299b61e1eab8bfab739d56b9670c75082638fd695d2c58b6569a349dc@group.calendar.google.com',
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const eventos = respuesta.data.items;

    // Iterar sobre los eventos y mostrar el resumen junto con las fechas
    eventos.forEach(evento => {
      const resumen = evento.summary;
      const fechaInicio = new Date(evento.start.dateTime);
      const fechaFin = new Date(evento.end.dateTime);
      
      console.log('Resumen:', resumen);
      console.log('Fecha de inicio:', fechaInicio.toLocaleString());
      console.log('Fecha de fin:', fechaFin.toLocaleString());
      console.log('----------------------------------------');
    });
  } catch (err) {
    console.error('Error al obtener eventos del calendario:', err);
  }
}

// Llama a la función para listar eventos para hoy
listarEventosHoy();
