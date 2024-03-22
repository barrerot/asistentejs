'use strict';

const mongoose = require('mongoose');

// Modelo
const eventoSchema = mongoose.Schema({
    summary: { type: String, index: true },
    start: { type: Date , index: true }, 
    end: { type: Date , index: true }, 
});

// Métodos
eventoSchema.statics.listar = function(request) {
    const summary = request.query.summary;
    const start = request.query.start;
    const end = request.query.end;
    const range = request.query.range;
    const limit = parseInt(request.query.limit);
    const skip = parseInt(request.query.skip);
    const sort = request.query.sort;

    const filtro = {};
    if (summary) {
        filtro.summary = { $regex: `.*${summary}`, $options: "i" }
    };
    if (start) {
        filtro.start = start
    };
    if (end) {
        filtro.end = end
    };

    const query = this.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();
};

eventoSchema.statics.getTags = function() {
    const query = this.find();
    query.select("tags");
    return query.exec();
};

eventoSchema.statics.createEvento = function() {
    // Agrega aquí la lógica para crear un evento
};

// Modelo y Export
const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
