'use strict';

const mongoose = require('mongoose');
const fsPromises = require('fs').promises;

const eventoSchema = mongoose.Schema({
    summary: { type: String, index: true },
    start: { type: Date, index: true },
    end: { type: Date, index: true },
});

eventoSchema.statics.listar = function(filters) {
    const query = this.find(filters);
    return query.exec();
};

eventoSchema.statics.createEvento = function() {
    // Agrega aquí la lógica para crear un evento
};

eventoSchema.statics.cargaJson = async function(fichero) {
    const data = await fsPromises.readFile(fichero, { encoding: 'utf8' });

    if (!data) {
        throw new Error(fichero + ' está vacío!');
    }

    const eventos = JSON.parse(data).eventos;
    const numEventos = eventos.length;

    for (let i = 0; i < eventos.length; i++) {
        await (new this(eventos[i])).save();
    }

    return numEventos;
};

const Evento = mongoose.model('Eventos', eventoSchema);
module.exports = Evento;
