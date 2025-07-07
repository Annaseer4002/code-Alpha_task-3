const mongoose = require ('mongoose')

const authSchema = new mongoose.Schema ({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'}

},{timestamps:true})



module.exports = new mongoose.model('Auth',authSchema)