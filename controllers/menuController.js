const mongoose = require('mongoose')

const menuModel = require('../models/menuModel')


const HandleAddMenuItem = async (req, res) => {
    const {name, price, ingredients} = req.body

    if(!name) {
        return res.status(400).json({message:'All fields required'})
    }

     if(!price) {
        return res.status(400).json({message:'All fields required'})
    }

       if(!ingredients) {
        return res.status(400).json({message:'All fields required'})
    }

   const checkMenu = await menuModel.findOne({name})

    if(checkMenu) {
        return res.status(400).json({message:'Menu item already exist'})}

    const menu = new menuModel({
        name,  
        price,
        ingredients 
       
    })

    await menu.save()

    res.status(201).json({
        message:'menu item added successfully',
        menu: {
            name: menu?.name,
            price: menu?.price,
            ingredients: menu?.ingredients
        }
    })
}

const HandleDeleteMenuItem = async (req, res) => {
    const { id } = req.params

    if(!id) {
        return res.status(401).json({message:'Id is required'})
    }

    const deletedMenu = await menuModel.findByIdAndDelete(id)

    res.status(200).json({
        message:'Deleted successfully'
    })
}

const HandleUpdateMenuItem = async (req, res) => {
    const { id } = req.params
    const {name, price, ingredients} = req.body

    if(!id){
        return res.status(400).json({message:'id is required'})
    }

    const updatedMenu = await menuModel.findByIdAndUpdate(id, {
        name, 
        price, 
        ingredients
    }, {new:true})

    await updatedMenu.save()

    res.status(201).json({
        message:'Success',
        updatedMenu
    })
}

const HandleFindAllMenus = async (req, res) => {
   
    const menu = await menuModel.find().populate('ingredients.inventoryId') 

    if(!menu){
        return res.status(404).json({message:'No available menu`s'})
    }

    res.status(200).json({
        message:'success',
        menu
    })
}

const HandleFindOneMenu = async (req, res) => {
    const { id } = req.params

    if(!id){
        return res.status(400).json({message:'id is required'})
    }

    const menu = await menuModel.findById(id).populate('ingredients.inventoryId')

    if(!menu){
        return res.status(404).json({message:'menu not found'})
    }

    res.status(200).json({
        message:'success',
        menu
    })
}

module.exports = {
   HandleAddMenuItem,
   HandleDeleteMenuItem,
   HandleUpdateMenuItem,
   HandleFindAllMenus,
   HandleFindOneMenu
}