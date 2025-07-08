const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    ingredients: [
        {
            inventoryId: {type: mongoose.Schema.Types.ObjectId, 
            ref:'Inventory', required: true},

            quantity: {type: Number, required: true},

            unit: {type: String, required: true}
        }
        ],
    
}, {timestamps: true})

module.exports = mongoose.model ('Menu', menuSchema)