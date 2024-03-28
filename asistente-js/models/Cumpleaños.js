const mongoose = require('mongoose');
const fsPromises = require('fs').promises;

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
CumpleañosSchema.statics.cargaJson = async function (fichero) {
    const data = await fsPromises.readFile(fichero, { encoding: 'utf8' });
  
    if (!data) {
      throw new Error(fichero + ' está vacio!');
    }
  
    const cumpleaños = JSON.parse(data).cumpleaños;
    const numCumpleaños = cumpleaños.length;
  
    for (var i = 0; i < cumpleaños.length; i++) {
      await (new this(cumpleaños[i])).save();
    }
  
    return numCumpleaños;
};

// Exportación del modelo
const Cumpleaños = mongoose.model('Cumpleaños', CumpleañosSchema);
module.exports = Cumpleaños;
