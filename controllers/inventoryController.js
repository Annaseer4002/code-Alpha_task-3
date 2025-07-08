const mongoose = require('mongoose')
const inventoryModel = require('../models/inventoryModel')

const HandleCreateInventory = async (req, res) => {
   
try {
        
         const {itemName, quantityInstock, unit} = req.body

    if(!itemName) {
        return res.status(400).json({message:'Please enter an item name'})
    }

     if(!quantityInstock) {
        return res.status(400).json({message:'quantity is required'})
    }

    if(!unit){
        return res.status(400).json({message:'item`s unit is required'})
    }

    const checkItem = await inventoryModel.findOne(itemName)

    if(checkItem){
        return res.status(400).json({message:'item name already exist'})
    }

    const item = new inventoryModel({
        itemName,
        quantityInStock,
        unit
    })

    await item.save()

    res.status(201).json({
        message:'Item added successful',
        item: {
            itemName: item?.itemName,
            quantity: item?.quantityInStock,
            unit: item?.unit,
            id: item?._id
        }
    })



} catch (error) {
        res.status(500).json(error.message)
     }


}

const HandleUpdateInventory = async (req, res) => {
   
   try {
     
    const {id} = req.params

    const {itemName, quantityInStock, unit} = req.body

    if(!id){
        return res.status(400).json({message:'Id is required'})
    }

    const item = await inventoryModel.findByIdAndUpdate(id,{
        itemName,
        quantityInStock,
        unit
    },{new:true})

    await item.save()

    res.status(201).json({
        message:'item successfully updated',
        item
    })




   } catch (error) {
      res.status(500).json(error.message)
   }
   
}

module.exports = {
    HandleCreateInventory,
    HandleUpdateInventory
}