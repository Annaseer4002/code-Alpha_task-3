const mongoose = require('mongoose')
const inventoryModel = require('../models/inventoryModel')
const menuModel = require('../models/menuModel')

const orderValidation = async (req, res, next) => {
    try{
       
         const { userId, items } = req.body

        if(!userId) {
            return res.status(400).json({message:'User id is required'})
        }

        if(!items || items.length === 0) {
            return res.status(400).json({message:'Please add items to your order'})
        }

        for (let item of req.body.items) {
            const menu = await menuModel.findById(item.menuId).populate('ingredients.inventoryId')

              if (!menu) {
            return res.status(404).json({ message: `Menu item ${item.menuId} not found` });
        }




        for (let ingredient of menu.ingredients) {
             const requiredQuantity = ingredient.quantity * item.quantity;
             const inventory = ingredient.inventoryId;

             
        if(!inventory) {
            return res.status(404).json({ message: `Inventory item ${ingredient.inventoryId} not found` });
        }

        if(inventory.quantityInStock < requiredQuantity) {
            return res.status(400).json({ message: `Not enough stock for ${inventory.name}` });
        }

        }


        }

      


        next()



    } catch(error){
        res.status(500).json({message:error.message})
    }
}


module.exports = {
    orderValidation
}