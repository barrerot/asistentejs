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

    console.log('Eventos obtenidos:', eventos);

    return eventos.map(evento => ({
      summary: evento.summary,
      start: evento.start.dateTime,
      end: evento.end.dateTime,
    }));
  } catch (err) {
    console.error('Error al obtener eventos del calendario:', err);
    throw err;
  }
}
