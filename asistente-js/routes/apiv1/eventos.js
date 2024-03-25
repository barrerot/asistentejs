'use strict';

const express = require('express');
const router = express.Router();
const Evento = require('../../models/Evento');

router.get('/', async (req, res, next) => {
    try {
        const { start, end, day } = req.query;
        let filters = {};
        if (start && end) {
            filters.start = { $gte: start, $lte: end };
        } else if (day) {
            filters.start = { $gte: day, $lte: new Date(day).setHours(23, 59, 59, 999) };
        }
        const eventos = await Evento.listar(filters);
        res.json(eventos);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
