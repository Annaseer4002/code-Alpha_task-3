const express = require('express')
const { HandleAddMenuItem, HandleDeleteMenuItem, HandleUpdateMenuItem } = require('../controllers/menuController')



const router = express.Router()

router.post('/addMenuItem', HandleAddMenuItem)

router.delete('/deleteMenu/:id', HandleDeleteMenuItem)

router.put('/updateMenu', HandleUpdateMenuItem)

module.exports = router