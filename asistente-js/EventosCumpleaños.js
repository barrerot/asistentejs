const { google } = require('googleapis');
const key = require('./credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

class EventosCumpleaños {
  constructor(calendarId) {
    this.auth = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: SCOPES,
    });

    this.calendarId = calendarId;
    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async listarEventosPorFecha(fecha) {
    try {
      const inicioDelDia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0);
      const timeMin = inicioDelDia.toISOString();
      const finDelDia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 23, 59, 59);
      const timeMax = finDelDia.toISOString();

      const respuesta = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: timeMin,
        timeMax: timeMax,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const eventos = respuesta.data.items;

      eventos.forEach(evento => {
        const resumen = evento.summary;
        const fechaInicio = new Date(evento.start.dateTime);
        const fechaFin = new Date(evento.end.dateTime);
        
        console.log('Evento:', resumen);
        console.log('Fecha de inicio:', fechaInicio.toLocaleString());
        console.log('Fecha de fin:', fechaFin.toLocaleString());
        console.log('----------------------------------------');
      });
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
      throw err;
    }
  }
}

module.exports = EventosCumpleaños;
