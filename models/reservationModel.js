const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    tableId: {type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true},
    guestNumber: {type: Number, required: true},
    customerName: {type: mongoose.Schema.Types.ObjectId, ref:'Auth', required: true},
    reservedAt: {type: Date, default: Date.now}


})