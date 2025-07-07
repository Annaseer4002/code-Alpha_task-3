const express = require('express')
const { HandleOrganizerSignUp, HandleLogin } = require('../controllers/organizerAuthController')

router = express.Router()

router.post('/organizerSignUp', HandleOrganizerSignUp)

router.post('/Login', HandleLogin)