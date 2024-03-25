'use strict';

const express = require('express');
const router = express.Router();
const Cumpleaños = require('../../models/Cumpleaños');

router.get('/', async (req, res, next) => {
    try {
        const { day, start, end } = req.query;

        if (day) {
            console.log('Fecha recibida:', day);

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
            return res.json(cumpleaños);
        } else if (start && end) {
            console.log('Fecha de inicio recibida:', start);
            console.log('Fecha de fin recibida:', end);

            if (isNaN(new Date(start).getTime()) || isNaN(new Date(end).getTime())) {
                console.log('Rango de fechas no válido. Devolviendo todos los cumpleaños.');
                const cumpleaños = await Cumpleaños.listar({});
                return res.json(cumpleaños);
            }

            const parsedStartDate = new Date(start);
            const parsedEndDate = new Date(end);
            console.log('Fecha de inicio parseada:', parsedStartDate);
            console.log('Fecha de fin parseada:', parsedEndDate);

            const filters = {
                start: parsedStartDate,
                end: new Date(parsedEndDate.setHours(23, 59, 59, 999))
            };

            console.log('Filtros de consulta:', filters);

            const cumpleaños = await Cumpleaños.listar(filters);
            return res.json(cumpleaños);
        } else {
            console.log('No se proporcionó una fecha válida. Devolviendo todos los cumpleaños.');
            const cumpleaños = await Cumpleaños.listar({});
            return res.json(cumpleaños);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
