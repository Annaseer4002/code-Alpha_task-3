const express = require('express');
const { HandleReserveTable, HandleGetReservations, HandleDeleteReservation } = require('../controllers/reservationController');
const { AvailableTableValidation } = require('../middlewares/reservationMiddleware');

const Router = express.Router();

Router.post('/reserveTable',  AvailableTableValidation, HandleReserveTable)
Router.get('/getReservations', HandleGetReservations)
Router.delete('/cancelReservation/:id', HandleDeleteReservation)


module.exports = Router;