const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    itemName: {type: String, required: true},
    quantityInStock: {type: Number, required: true},
    unit: {type: unit, required: true}
    
},{timestamps: true})

module.exports = new mongoose.model('Inventory', inventorySchema)