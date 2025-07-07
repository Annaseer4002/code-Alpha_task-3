const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    tableNumber: {type: Number, required: true, unique: true},
    capacity: {type: Number, required: true, min: 0},
    status: {type: String, enum: ['reserved','available'], default:'available'}
}, {timestamps: true})

module.exports = mongoose.model ('Table', userSchema)