const mongoose = require('mongoose')
const tablesModel = require('../models/tablesModel')


const HandleCreateTable = async (req, res) => {
   
     const {tableNumber, capacity} = req.body

     try {

        if(!tableNumber){
            return res.status(400).json({message:'Table No. is required'})
        }

         if(!capacity){
            return res.status(400).json({message:'capacity is required'})
        }

        const checkTable = await tablesModel.findOne(tableNumber)

        if(tableNumber){
            return res.status(400).json({message:'Table already exist'})
        }

        const table = new tablesModel({
            tableNumber,
            capacity
        })

        await table.save()

        res.status(201).json({
            message:'Table created Succesful',
            tabel: {
                tabelNumber: table?.tableNumber,
                capacity: table?.capacity,
                id: table?._id
            }
        })


        
     } catch (error) {
        res.status(500).json(error.message)
     }
   
}

const HandleUpdateTable = async (req, res) => {
   
   try {

       const { id } = req.params

       const { capacity } = req.body

       if(!id){
          return res.status(400).json({message:'id is required'})
       }

       if(!capacity || capacity < 1) {
        return res.status(400).json({message:'Invalid input'})
       }

       const updatedTable = await tablesModel.findByIdAndUpdate(id,
        {$set: {capacity} },
        {new:true})

       if(!updatedTable) {
         return res.status(404).json({message:'Table not found'})
       }

      


   } catch (error) {
     res.status(500).json(error.message)
   }
}


 module.exports = {
    HandleCreateTable,
    HandleUpdateTable
 }