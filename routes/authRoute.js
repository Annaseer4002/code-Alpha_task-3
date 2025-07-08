const express = require('express');
const { HandleSignUp, HandleLogin, HandleForgetPassword, HandleResetPassword } = require('../controllers/authControlllers');

const Router = express.Router();

Router.post('/signUp', HandleSignUp)
Router.post('/login', HandleLogin)
Router.post('/forgotPassword', HandleForgetPassword)
Router.post('/resetPassword', HandleResetPassword)

module.exports = Router;