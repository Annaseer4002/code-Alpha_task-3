const express = require('express');

const Router = express.Router();

authRoutes = require('./authRoute');
menuRoutes = require('./menuRoute')
inventoryRoutes = require('./inventoryRoute')
tableRoutes = require('./tableRoute')
reservationRoutes = require('./reservationRoute')
orderRoutes = require('./orderRoute')





const routes = [
    authRoutes,
    menuRoutes,
    inventoryRoutes,
    tableRoutes,
    reservationRoutes,
    orderRoutes
    
    
]

module.exports = routes;

