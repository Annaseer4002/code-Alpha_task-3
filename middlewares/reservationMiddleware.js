const mongoose = require('mongoose')
const tablesModel = require("../models/tablesModel")
const authModel = require('../models/authModel')

const AvailableTableValidation = async (req, res, next) => {
   
    try{

        const {tableId, guestNumber, userId } = req.body

    if(!tableId) {
        return res.status(400).json({message:'Table id is required'})
    }

    if(!guestNumber) {
        return res.status(400).json({message:"please enter the guest number"})
    }


    if(!userId) {
        return res.status(401).json({message:'User id is required '})
    }

    const table = await tablesModel.findById(tableId)

    if(!table){
        return res.status(404).json({message:'Table not found'})
    }

    if(table.status === 'reserved'){
         return res.status(404).json({message:'Table already reserved'})
    }

    if(guestNumber > 5) {
        return res.status(400).json({message:'sorry, each table takes maximum of five (5) guest'})
    }

    if(table.tableNumber > '50'){
        return res.status(400).json({message:'Table not found'})
    }
  

    next()



    } catch (error){
        return res.status(500).json({message:error.message})
    }
    
}

module.exports = {
    AvailableTableValidation
}