const express = require('express');

const Router = express.Router();

authRoutes = require('./authRoute');
menuRoutes = require('./menuRoute')




const routes = [
    authRoutes,
    menuRoutes
]

module.exports = routes;

