const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantityInStock: {type: Number, required: true},
    unit: {type: String, required: true}
    
},{timestamps: true})

module.exports = new mongoose.model('Inventory', inventorySchema)