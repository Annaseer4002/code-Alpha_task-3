const express = require('express')
const { HandleAddMenuItem, HandleUpdateMenuItem, HandleDeleteMenuItem, HandleFindAllMenus, HandleFindOneMenu } = require('../controllers/menuController')

const Router = express.Router()

Router.post('/menu', HandleAddMenuItem)
Router.post('/updateMenu', HandleUpdateMenuItem)
Router.delete('/deleteMenu', HandleDeleteMenuItem)
Router.get('/allMenu', HandleFindAllMenus)
Router.get('/oneMenu', HandleFindOneMenu)

module.exports = Router;