'use strict';

const readLine = require('readline');

const utils =  {

  askUser(question) {
    return new Promise((resolve) => {
      const rl = readLine.createInterface({
        input: process.stdin, output: process.stdout
      });
      rl.question(question, answer => {
        rl.close();
        resolve(answer);
      });
    });
  },  

  isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
  },

  buildAnuncioFilterFromReq(req) {
    const filters = {};

    if (req.query.tag) {
      filters.tags = { $in: req.query.tag };
    }
  
    if (typeof req.query.venta !== 'undefined') {
      filters.venta = req.query.venta;
    }
  
    if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
      if (req.query.precio.indexOf('-') !== -1) {
        filters.precio = {};
        let rango = req.query.precio.split('-');
        if (rango[0] !== '') {
          filters.precio.$gte = rango[0];
        }
  
        if (rango[1] !== '') {
          filters.precio.$lte = rango[1];
        }
      } else {
        filters.precio = req.query.precio;
      }
    }
  
    if (typeof req.query.nombre !== 'undefined') {
      filters.nombre = new RegExp('^' + req.query.nombre, 'i');
    }

    return filters;
  },

  // Función para construir filtros de eventos desde la solicitud
  buildEventosFilterFromReq(req) {
    const filters = {};

    if (req.query.summary) {
        filters.summary = new RegExp('^' + req.query.summary, 'i');
    }

    if (req.query.start) {
        filters.start = req.query.start;
    }

    if (req.query.end) {
        filters.end = req.query.end;
    }

    if (typeof req.query.limit !== 'undefined') {
        filters.limit = parseInt(req.query.limit);
    }

    if (typeof req.query.skip !== 'undefined') {
        filters.skip = parseInt(req.query.skip);
    }

    if (req.query.sort) {
        filters.sort = req.query.sort;
    }

    return filters;
  },

  // Función para construir filtros de cumpleaños desde la solicitud
  buildCumpleañosFilterFromReq(req) {
    const filters = {};

    if (req.query.summary) {
        filters.summary = new RegExp('^' + req.query.summary, 'i');
    }

    if (req.query.start) {
        filters.start = req.query.start;
    }

    if (req.query.end) {
        filters.end = req.query.end;
    }

    if (typeof req.query.limit !== 'undefined') {
        filters.limit = parseInt(req.query.limit);
    }

    if (typeof req.query.skip !== 'undefined') {
        filters.skip = parseInt(req.query.skip);
    }

    if (req.query.sort) {
        filters.sort = req.query.sort;
    }

    return filters;
  }

};

module.exports = utils;
