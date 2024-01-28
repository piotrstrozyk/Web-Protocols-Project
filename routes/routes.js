const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js')
const Comment = require('../models/commentSchema.js')
const Channel = require('../models/channelSchema.js')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


// const fs = require('fs');
// const util = require('util');
// const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');

// };




const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePreffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage })

router.post('/register',  asyncHandler(async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        "name": req.body.name,
        "surname": req.body.surname,
        "nick": req.body.nick,
        "email": req.body.email,
        "password": hashedPwd
    })
    if (!await getUserByEmail(req.body.email)){
    const newUser = await user.save()
    res.status(201).json(newUser)
    } else {
        res.status(500).json( {message: "User with that email already exists"})
    }
    
}))

router.post('/login', async (req,res) => {
   
    try {
        const users = await User.findOne({ email: req.body.email })
        if(users) {
            bcrypt.compare(req.body.password, users.password, function(err, isMatch) {
                if (isMatch) {
                    res.cookie('user', users.email,  { expires: new Date(Date.now() + (5 * 60000)) }, {sameSite: "none", secure: true})
                    res.status(201).json( { message: `user ${users.nick} logged in` });
                    
                } else {
                    res.status(500).json({ message: "Incorrect password" });
                }
            });
        }
    } catch (err) {
        res.status(404).json({message: err.message})
    }}
    )


const getUserByEmail = (adress) => User.findOne({ email: adress });

module.exports = router