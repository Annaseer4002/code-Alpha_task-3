const mongoose = require('mongoose')
const tablesModel = require('../models/tablesModel')


const HandleCreateTable = async (req, res) => {
   
     const {tableNumber, seats} = req.body

     try {

        if(!tableNumber){
            return res.status(400).json({message:'Table No. is required'})
        }

         if(!seats){
            return res.status(400).json({message:'seat number are required'})
        }

        const checkTable = await tablesModel.findOne({tableNumber})

        if(checkTable){
            return res.status(400).json({message:'Table already exist'})
        }

        const table = new tablesModel({
            tableNumber,
            seats
        })

        await table.save()

        res.status(201).json({
            message:'Table created Succesful',
            tabel: {
                tabelNumber: table?.tableNumber,
                seats: table?.seats,
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

       const { seats } = req.body

       if(!id){
          return res.status(400).json({message:'id is required'})
       }

       if(!seats || seats < 1) {
        return res.status(400).json({message:'Invalid input, seats number is required'})
       }

       const updatedTable = await tablesModel.findByIdAndUpdate(id,
        {$set: {seats} },
        {new:true})

       if(!updatedTable) {
         return res.status(404).json({message:'Table not found'})
       }
        
       await updatedTable.save()
         res.status(200).json({
              message:'Table updated successfully',
              table: {
                tableNumber: updatedTable?.tableNumber,
                seats: updatedTable?.seats,
                id: updatedTable?._id
              }
         })
      


   } catch (error) {
     res.status(500).json(error.message)
   }
}


 module.exports = {
    HandleCreateTable,
    HandleUpdateTable
 }