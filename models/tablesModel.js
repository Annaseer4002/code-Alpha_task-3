const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    tableNumber: {type: Number, required: true, unique: true, min: 1, max: 50},
    seats: {type: Number, required: true, min: 0, max: 5},
    status: {type: String, enum: ['reserved','available'], default:'available'}
}, {timestamps: true})

module.exports = mongoose.model ('Table', tableSchema)