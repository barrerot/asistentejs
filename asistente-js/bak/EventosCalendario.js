const { google } = require('googleapis');
const key = require('./credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

class EventosCalendario {
  constructor() {
    this.auth = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: SCOPES,
    });

    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async listarEventosPorFecha(fecha) {
    try {
      const inicioDelDia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0);
      const timeMin = inicioDelDia.toISOString();
      const finDelDia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 23, 59, 59);
      const timeMax = finDelDia.toISOString();

      console.log('timeMin:', timeMin);
      console.log('timeMax:', timeMax);

      const respuesta = await this.calendar.events.list({
        calendarId: '43ab978299b61e1eab8bfab739d56b9670c75082638fd695d2c58b6569a349dc@group.calendar.google.com',
        timeMin: timeMin,
        timeMax: timeMax,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const eventos = respuesta.data.items;
      console.log('Eventos obtenidos:', eventos);

      const eventosFormateados = eventos.map(evento => {
        return {
          resumen: evento.summary,
          fechaInicio: new Date(evento.start.dateTime).toLocaleString(),
          fechaFin: new Date(evento.end.dateTime).toLocaleString()
        };
      });

      console.log('Eventos formateados:', eventosFormateados);

      return eventosFormateados;
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
      throw err;
    }
  }
}

module.exports = EventosCalendario;
