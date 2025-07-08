const express = require('express')
const { HandleCreateTable, HandleUpdateTable } = require('../controllers/tablesController')

const Router = express.Router()

Router.post('/table', HandleCreateTable)
Router.put('/updateTable/:id', HandleUpdateTable)


module.exports = Router