const express = require('express');
const { HandlePlaceOrderModel } = require('../controllers/ordersController');
const { orderValidation } = require('../middlewares/orderMiddleware');

const Router = express.Router()

Router.post('/placeOrder',orderValidation, HandlePlaceOrderModel)

module.exports = Router;