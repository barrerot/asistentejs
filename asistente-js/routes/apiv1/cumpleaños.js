'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Cumpleaños = mongoose.model('Cumpleaños');

// Return the list of cumpleaños
router.get('/', asyncHandler(async (req, res, next) => {
  const cumpleaños = await Cumpleaños.find(); // Buscar todos los cumpleaños sin filtros adicionales
  res.json({ result: cumpleaños });
}));

// Create
router.post('/', [
  body('summary').isString().withMessage('summary must be string'),
  body('start').isISO8601().withMessage('start must be a valid date'),
  body('end').isISO8601().withMessage('end must be a valid date'),
], asyncHandler(async (req, res) => {
  validationResult(req).throw();
  const cumpleañosData = req.body;
  const cumpleaños = new Cumpleaños(cumpleañosData);
  const cumpleañosGuardado = await cumpleaños.save();
  res.json({ result: cumpleañosGuardado });
}));

module.exports = router;
