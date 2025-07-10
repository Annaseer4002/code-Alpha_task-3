const mongoose = require('mongoose')
const reservationModel = require('../models/reservationModel')
const tablesModel = require('../models/tablesModel')


const HandleReserveTable = async (req, res) => {
   try {
     const {tableId, guestNumber, userId } = req.body 

    const reservation = new reservationModel({
        tableId, guestNumber, userId
    })

    const table = await tablesModel.findByIdAndUpdate(tableId)
       
    table.status = 'reserved'


    await table.save()

    await reservation.save()

    res.status(201).json({
        message:'Table reserved successfully',
        reservation: {
            tableId: reservation?.tableId,
            guestNumber: reservation?.guestNumber,
            userId: reservation?.userId,
            reservedAt: reservation?.reservedAt
        }
    })
   } catch (error) {
res.status(500).json(error.message)
   }
}

const HandleGetReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find().populate('tableId').populate('userId',('userName email'))
        res.status(200).json(reservations)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const HandleDeleteReservation = async (req, res) => {
   try {

     const { id } = req.params

    if(!id) {
        return res.status(400).json({message:'Id is required'})
    }

    const deletedReservation = await reservationModel.findByIdAndDelete(id)

    if(!deletedReservation) {
        return res.status(404).json({message:'Reservation not found'})
    }

    res.status(200).json({
        message:'Reservation deleted successfully'
    })
    
   } catch (error) {
      res.status(500).json(error.message)
   }
}


module.exports = {
    HandleReserveTable,
    HandleGetReservations,
    HandleDeleteReservation 
}