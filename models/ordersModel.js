const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'Auth', required: true},
  items: [
    {
        menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Menu', 
        required: true},

       quantity: {
        type: Number,
        required: true, 
        min: 1}

    },

    
  ],

  status: {
    type: String,
    enum: ['pending','preparing','served','completed','cancelled'],
    dafault: 'pending'
  },

  totalPrice: {
    type: Number,
    required: true

  },

  createdAt: {
    type: Date,
    default: Date.now
  }
 
        
})

module.exports = new mongoose.model('Order', orderSchema)