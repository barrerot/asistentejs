const fs = require('fs');
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
    this.eventos = [];
  }

  async obtenerEventosDelAño(year) {
    try {
      for (let month = 0; month < 12; month++) {
        const inicioDelMes = new Date(year, month, 1, 0, 0, 0);
        const finDelMes = new Date(year, month + 1, 0, 23, 59, 59);
        await this.listarEventosPorFecha(inicioDelMes, finDelMes);
      }

      // Escribir eventos en un archivo JSON
      fs.writeFileSync('eventos.json', JSON.stringify(this.eventos, null, 2));
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
    }
  }

  async listarEventosPorFecha(timeMin, timeMax) {
    try {
      const respuesta = await this.calendar.events.list({
        calendarId: '43ab978299b61e1eab8bfab739d56b9670c75082638fd695d2c58b6569a349dc@group.calendar.google.com',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        maxResults: 2500, // Obtener hasta 2500 eventos por mes
        singleEvents: true,
        orderBy: 'startTime',
      });

      const eventos = respuesta.data.items;
      eventos.forEach(evento => {
        this.eventos.push({
          summary: evento.summary,
          start: evento.start.dateTime,
          end: evento.end.dateTime
        });
      });
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
    }
  }
}

class EventosCumpleaños {
  constructor() {
    this.auth = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: SCOPES,
    });

    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
    this.cumpleaños = [];
  }

  async obtenerCumpleañosDelAño(year) {
    try {
      for (let month = 0; month < 12; month++) {
        const inicioDelMes = new Date(year, month, 1, 0, 0, 0);
        const finDelMes = new Date(year, month + 1, 0, 23, 59, 59);
        await this.listarEventosPorFecha(inicioDelMes, finDelMes);
      }

      // Escribir cumpleaños en un archivo JSON
      fs.writeFileSync('cumpleaños.json', JSON.stringify(this.cumpleaños, null, 2));
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
    }
  }

  async listarEventosPorFecha(timeMin, timeMax) {
    try {
      const respuesta = await this.calendar.events.list({
        calendarId: '4eb2a07a481552a715397611e9475770bbad2bca0a9ebce6901d3b103fc37cf5@group.calendar.google.com',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        maxResults: 2500, // Obtener hasta 2500 eventos por mes
        singleEvents: true,
        orderBy: 'startTime',
      });

      const eventos = respuesta.data.items;
      eventos.forEach(evento => {
        this.cumpleaños.push({
          summary: evento.summary,
          start: evento.start.dateTime,
          end: evento.end.dateTime
        });
      });
    } catch (err) {
      console.error('Error al obtener eventos del calendario:', err);
    }
  }
}

const eventosCalendario = new EventosCalendario();
const eventosCumpleaños = new EventosCumpleaños();

eventosCalendario.obtenerEventosDelAño(2024);
eventosCumpleaños.obtenerCumpleañosDelAño(2024);
