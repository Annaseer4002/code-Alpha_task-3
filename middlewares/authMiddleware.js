const mongoose = require('mongoose')

const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')


const Authorization = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        
        if(!token){
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        console.log(token);

        

        const splitToken = token.split(' ')
        console.log(splitToken);

        const realToken = splitToken[1]
        console.log(realToken);

        const verifyToken = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);
        
        console.log(verifyToken);

        if(!verifyToken) {
            return res.status(401).json({message: 'Unauthorized access'});
        }

      req.user = verifyToken.user;
        

        console.log(req.user.email);
        next()
        





    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}


const AdminAuthorization = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        
        if(!token){
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // console.log(token);

        

        const splitToken = token.split(' ')
        // console.log(splitToken);

        const realToken = splitToken[1]
        // console.log(realToken);

        const verifyToken = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);
        
        // console.log(verifyToken);

        if(!verifyToken) {
            return res.status(401).json({message: 'Unauthorized access'});
        }

      req.user = verifyToken.user;

      if(req.user.role !== 'admin') {
        return res.status(400).json({
            message: 'Access denied only Admin can create course'
        })
      }
        

        // console.log(req.user.email);
        next()
        





    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

module.exports = {
    Authorization,
    AdminAuthorization
}