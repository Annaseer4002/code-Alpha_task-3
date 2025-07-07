const express = require('express')
const { HandleCreateEvent, HandleShowAllEvents, HandleGetOneEvent, HandleDeleteEvent } = require('../controllers/eventControllers')
const { createEventValidation } = require('../middlewares/eventMiddleware')
const { organizerAuthorization } = require('../middlewares/organizerAuthMiddleware')


const router = express.Router()

router.post('/createEvent', organizerAuthorization, createEventValidation, HandleCreateEvent)

router.get('/allEvents', HandleShowAllEvents)

router.get('/event/:id', HandleGetOneEvent )

router.delete('/deleteEvent', organizerAuthorization, HandleDeleteEvent)



module.exports = router