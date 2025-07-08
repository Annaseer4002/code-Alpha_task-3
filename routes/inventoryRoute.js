const express = require('express')
const { HandleCreateInventory, HandleUpdateInventory, HandleGetAllInventories, HandleGetInventory } = require('../controllers/inventoryController')

const Router = express.Router()

Router.post('/inventory', HandleCreateInventory)
Router.put('/updateInventory', HandleUpdateInventory)
Router.get('/getInventories', HandleGetAllInventories)
Router.get('/getOneInventory/:id', HandleGetInventory)

module.exports = Router