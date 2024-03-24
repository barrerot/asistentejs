'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Evento = mongoose.model('Eventos'); // Corregido el nombre del modelo
const { buildEventosFilterFromReq } = require('../../lib/utils');

// Return the list of eventos
router.get('/', asyncHandler(async (req, res, next) => {
  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';
  const includeTotal = req.query.includeTotal === 'true';

  const filters = buildEventosFilterFromReq(req);

  try {
    const eventos = await Evento.listar(filters, start, limit, sort, includeTotal); // Cambio aquí
    res.json({ result: eventos });
  } catch (error) {
    next(error);
  }
}));

// Create
router.post('/', [
  // validaciones:
  body('nombre').isAlphanumeric().withMessage('nombre must be string'),
  body('venta').isBoolean().withMessage('must be boolean'),
  body('precio').isNumeric().withMessage('must be numeric'),
], asyncHandler(async (req, res) => {
  validationResult(req).throw();
  const eventoData = req.body;
  const evento = new Evento(eventoData);
  const eventoGuardado = await evento.save();
  res.json({ result: eventoGuardado });
}));

module.exports = router;
