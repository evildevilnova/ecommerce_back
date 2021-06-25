const express = require("express");
const app = express();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const shortid = require('shortid');
const path = require('path'); 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname)+'/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
exports.upload = multer({ storage: storage })

app.use(express.json());

// checking token
exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
        
            // .split(" ")[1]
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            // console.log('start');
            // console.log(token);
            // res.status(201).json({ message: token});
            // console.log(user);
        
    }else{
        return res.status(401).json({ message: "Authorization is required"});
    }
    
    next();
    
}

exports.userMiddleware = async (req , res, next) =>{
    try{
        const user = await User.findOne({_id: req.user._id});
        req.user = user;
        if(user.role !== 'user'){
            return res.status(400).json({ message: 'admin Access denied' });
        }else{
            next();
        }
    }catch(e){
        res.status(401).send(e);
    }
}

exports.adminMiddleware = async (req , res, next) =>{
    try{
        const user = await User.findOne({_id: req.user._id});
        req.user = user;
        if(user.role !== 'admin'){
            return res.status(400).json({ message: 'admin Access denied' });
        }else{
            next();
        }
    }catch(e){
        res.status(401).send(e);
    }
}