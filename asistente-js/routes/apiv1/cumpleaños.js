'use strict';

const express = require('express');
const router = express.Router();
const Cumpleaños = require('../../models/Cumpleaños');

router.get('/', async (req, res, next) => {
    try {
        const day = req.query.day;
        console.log('Fecha recibida:', day);

        if (!day || isNaN(new Date(day).getTime())) {
            console.log('No se proporcionó una fecha válida. Devolviendo todos los cumpleaños.');
            const cumpleaños = await Cumpleaños.listar({});
            return res.json(cumpleaños);
        }

        const parsedDate = new Date(day);
        console.log('Fecha parseada:', parsedDate);

        // Establecer la fecha de finalización para ser el final del día
        const endDate = new Date(parsedDate);
        endDate.setHours(23, 59, 59, 999);

        const filters = {
            start: parsedDate,
            end: endDate
        };

        console.log('Filtros de consulta:', filters);

        const cumpleaños = await Cumpleaños.listar(filters);
        res.json(cumpleaños);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
