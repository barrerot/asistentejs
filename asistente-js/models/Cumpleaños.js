'use strict';

const mongoose = require('mongoose');
const fsPromises = require('fs').promises;

// Modelo
const CumpleañosSchema = mongoose.Schema({
    summary: { type: String, index: true },
    start: { type: Date , index: true }, 
    end: { type: Date , index: true }, 
});

// Métodos
CumpleañosSchema.statics.listar = function(request) {
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

CumpleañosSchema.statics.getTags = function() {
    const query = this.find();
    query.select("tags");
    return query.exec();
};

CumpleañosSchema.statics.createCumpleaños = function() {
    // Agrega aquí la lógica para crear un Cumpleaños
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

// Modelo y Export
const Cumpleaños = mongoose.model('Cumpleaños', CumpleañosSchema);
module.exports = Cumpleaños;
