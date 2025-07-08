const mongoose = require('mongoose')
const tablesModel = require("../models/tablesModel")
const authModel = require('../models/authModel')

const AvailableTableValidation = async (req, res, next) => {
   
    const { id } = req.params

    const {guestNumber} = req.body

    if(!id) {
        return res.status(400).json({message:'id is required'})
    }

    if(!guestNumber) {
        return res.status(400).json({message:"please enter the guest number"})
    }

    const user = await authModel.findOne(req.user)

    if(!user) {
        return res.status(401).json({message:'Unauthorized Access '})
    }

    const table = await tablesModel.findById(id)

    if(table.status === 'reserved'){
         return res.status(404).json({message:'Table already reserved'})
    }

    if(table.capacity < guestNumber) {
        return res.status(400).json({message:'sorry, each table takes maximum of five (5) guest'})
    }

    if(table.tableNumber > '50'){
        return res.status(400).json({message:'Table not found'})
    }
  

    next()

}

module.exports = {
    AvailableTableValidation
}