const express = require('express')
const { HandleCreateTable, HandleUpdateTable, HandleFindAllTables } = require('../controllers/tablesController')

const Router = express.Router()

Router.post('/table', HandleCreateTable)
Router.put('/updateTable/:id', HandleUpdateTable)
Router.get('/allTables', HandleFindAllTables)


module.exports = Router