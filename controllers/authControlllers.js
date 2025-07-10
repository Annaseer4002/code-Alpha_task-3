const mongoose = require('mongoose')
const authModel = require('../models/authModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const HandleSignUp = async (req, res) => {
    try {

        const { email, userName, password } = req.body

    if(!email) {
        return res.status(404).json({message:'All fields required'})
    }
    
    if(!userName) {
        return res.status(404).json({message:'All fields required'})
    }

    if(!password) {
        return res.status(404).json({message:'All fields required'})
    }

    if(password.length < 6 ) {
        return res.status(400).json({message: 'password must be minimum of 6 characters'})
    }

    const existingUser = await authModel.findOne({email})

    if(existingUser) {
        return res.status(400).json({message:'user already exist, please login'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new authModel({
        email,
        userName,
        password: hashedPassword
    })

    await user.save()
    res.status(201).json({
        message: 'Account created successfully',
        user: {
            userName: user?.userName,
            email: user?.email,
            id: user?._id
        }
    })



    } catch (error) {
        res.status(400).json(error.message)
    }
}

const HandleLogin = async (req, res) => {
   
    try {
          const { email, password } = req.body

    if(!email) {
        return res.status(400).json({message:'Please enter your email'})
    }

      if(!password) {
        return res.status(400).json({message:'Please enter your password'})
    }

    const user = await authModel.findOne({email});

    if(!user) {
        return res.status(404).json({message:'user not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(404).json({message:'Incorrect email or password'});
    }


    //Generate Token
    const token = jwt.sign (
        { user},
        process.env.ACCESS_TOKEN,
        {expiresIn: '1h'}
       )
   
    //  refresh token
    const refreshToken = jwt.sign (
        { user },
        process.env.ACCESS_TOKEN,
        {expiresIn: '7d'}
    )

    res.status(200).json({
        message:'login successful',
        token,
        refreshToken,
        user: {
            user: user?.userName,
            email: user?.email,
             id: user?._id
        }
    })


        
    } catch (error) {
        res.status(400).json(error.message)
    }
     


}

const HandleForgetPassword = async (req, res) => {
    const  {email} = req.body
    try {

        
    if(!email){
        return res.status(400).json({message:'Email is required'})
    }

    const user = await authModel.findOne({email})

    if(!user){
        return res.status(400).json({message:'user not found'})
    }

    // send mail

    res.status(200).json({
        message:'mail sent, please check your email or spam folders',
        user
    })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const HandleResetPassword = async (req, res) => {
   try {

     const { password } = req.body

    if(!password){
        return res.status(400).json({message:'please enter your password'})
    }

    const user = await authModel.findOne(req.user.email)

    const hashedPassword = await bcrypt.hash(password, 12)

    const newPassword = await (user.password, hashedPassword)

    await newPassword.save()
    
   } catch (error) {
    res.status(500).json(error.message)
   }
}


module.exports = {
    HandleSignUp,
    HandleLogin,
    HandleForgetPassword,
    HandleResetPassword
}