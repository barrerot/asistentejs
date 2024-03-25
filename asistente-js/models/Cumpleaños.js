const mongoose = require('mongoose');

// Definición del esquema
const CumpleañosSchema = mongoose.Schema({
    summary: { type: String, index: true },
    start: { type: Date, index: true },
    end: { type: Date, index: true }
});

// Métodos estáticos
CumpleañosSchema.statics.listar = function(filters) {
    const { summary, start, end, limit, skip, sort } = filters;

    const filtro = {};
    if (summary) {
        filtro.summary = { $regex: `.*${summary}`, $options: "i" };
    }
    if (start) {
        // Convertir a objeto Date
        filtro.start = { $gte: new Date(start) };
    }
    if (end) {
        // Convertir a objeto Date
        filtro.end = { $lte: new Date(end) };
    }

    const query = this.find(filtro);
    if (limit) {
        query.limit(limit);
    }
    if (skip) {
        query.skip(skip);
    }
    if (sort) {
        query.sort(sort);
    }
    return query.exec();
};

// Exportación del modelo
const Cumpleaños = mongoose.model('Cumpleaños', CumpleañosSchema);
module.exports = Cumpleaños;
