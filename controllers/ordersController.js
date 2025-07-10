const mongoose = require('mongoose')
const ordersModel = require('../models/ordersModel');
const menuModel = require('../models/menuModel');

  const HandlePlaceOrderModel = async (req, res) => {
      
     try{



        const { userId, items } = req.body

    let totalPrice = 0;

    for (let item of items) {
      const menu = await menuModel.findById(item.menuId);

      if (!menu) {
        return res.status(404).json({ message: `Menu item ${item.itemId} not found` });
      }

      totalPrice += menu.price * item.quantity;
    }
    
    const order = new ordersModel ({
        userId,
        items,
        totalPrice
    })

    await order.save()

    res.status(201).json({
        message: 'Order placed successfully',
        order: {
            userId: order?.userId,
            items: order?.items,
            totalPrice: order?.totalPrice,
            _id: order?._id,
            orderedAt: order?.orderedAt
        }
    })

     }catch(error){
        res.status(500).json(error.message)
     }
  }




module.exports = {
   HandlePlaceOrderModel
}