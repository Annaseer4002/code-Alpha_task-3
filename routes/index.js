const express = require('express');

const Router = express.Router();

authRoutes = require('./authRoute');
menuRoutes = require('./menuRoute')
inventoryRoutes = require('./inventoryRoute')
tableRoutes = require('./tableRoute')




const routes = [
    authRoutes,
    menuRoutes,
    inventoryRoutes,
    tableRoutes
]

module.exports = routes;

