const mongoose = require('mongoose')
const inventoryModel = require('../models/inventoryModel')

const HandleCreateInventory = async (req, res) => {
   
try {
        
         const {name, quantityInStock, unit} = req.body

    if(!name) {
        return res.status(400).json({message:'Please enter an item name'})
    }

     if(!quantityInStock) {
        return res.status(400).json({message:'quantity is required'})
    }

    if(!unit){
        return res.status(400).json({message:'item`s unit is required'})
    }

    const checkItem = await inventoryModel.findOne({name})

    if(checkItem){
        return res.status(400).json({message:'item name already exist'})
    }

    const item = new inventoryModel({
        name,
        quantityInStock,
        unit
    })

    await item.save()

    res.status(201).json({
        message:'Item added successful',
        item: {
            name: item?.name,
            quantityInstock: item?.quantityInStock,
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

    const {name, quantityInStock, unit} = req.body

    if(!id){
        return res.status(400).json({message:'Id is required'})
    }

    const item = await inventoryModel.findByIdAndUpdate(id,{
        name,
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

const HandleGetAllInventories = async (req, res) => {
   
    const inventories = await inventoryModel.find()

    if(!inventories) {
        return res.status(404).json({message:'Inventories not found'})
    }

    res.status(200).json({
        message:'success',
        inventories
      
    })
}

const HandleGetInventory = async (req, res) => {
    
    const { id } = req.params

    if(!id) {
        return res.status(400).json({message:'id is required'})
    }

    const inventory = await inventoryModel.findById(id)

    if(!inventory){
        return res.status(404).json({message:"inventory not found"})
    }

    res.status(200).json({
        message:'success',
        inventory
    })
}

module.exports = {
    HandleCreateInventory,
    HandleUpdateInventory,
    HandleGetAllInventories,
    HandleGetInventory
}