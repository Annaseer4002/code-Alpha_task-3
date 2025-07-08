const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const dotenv = require ('dotenv')
const routes = require('./routes')



dotenv.config()

const app = express ()
app.use(express.json ())
app.use (cors())

const PORT = process.env.PORT || 5000

mongoose.connect (process.env.MONGODB_URL)
.then (()=> {
    console.log ('Connected to MongoDB')
    app.listen (PORT, () => {
        console.log (`Server is running on port ${PORT}`)
    })
})

app.get('/', (req, res)=>{
    res.json('Welcome To Restaurants Reservation System')
})


app.use('/api', routes)

