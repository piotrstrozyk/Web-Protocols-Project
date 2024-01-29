const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js')
const Comment = require('../models/commentSchema.js')
const Channel = require('../models/channelSchema.js')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const mqtt = require('mqtt');
// const mqttServer = 'ws://broker.emqx.io:8084/mqtt'
// const mqttClient = mqtt.connect(mqttServer)



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


//POST###########################
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
                    res.cookie('user', users.email,  { expires: new Date(Date.now() + (5 * 60000)) }, {sameSite: 'None', secure: true})
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

router.post('/addchannel',  asyncHandler(async (req, res) => {
    const channel = new Channel({
        "title": req.body.title
    })
    const newChannel = await channel.save()
    res.status(201).json(newChannel)
}))
    

router.post('/addcomment',  asyncHandler(async (req, res) => {
    const comment = new Comment({
        "user": req.cookies.user,
        "content": req.body.content,
        "channel": req.body.channel
    })
    const newComment = await comment.save()
    res.status(201).json(newComment)
}))

router.post('/comments', async(req, res) => {
    const comment = new Comment({
        "user": req.cookies.user,
        "content": req.body.content,
        "channel": req.body.channel
    })
    const newComment = await comment.save()
    res.status(201).json(newComment)
  });
  

//###################GET
router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.json({ message: 'Logout successful' });
  });

router.get('/allusers', (req, res) => {
    new Promise((resolve, reject) => {
        User.find()
            .then(users => resolve(users))
            .catch(err => reject({ message: err.message }));
    })
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

router.get('/allchannels', async (req, res) => {
    try {
      const channels = await Channel.find();
      res.json(channels);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/profile', async (req, res) => {
try {
    const email = req.body.email
    const user = await User.findOne({email: email});
    res.json(user);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});





//DELETE#################################
router.delete('/profile', asyncHandler(async (req, res) => {
    const mail = await req.cookies.user
    const users = await User.findOneAndDelete({ email: mail })
    if(users!==undefined){
        res.clearCookie('user');
        res.json(`User ${mail} deleted`)
    } else {
        res.json(`Error`)
    } 
}))

router.delete('/channel', asyncHandler(async (req, res) => {
    const channel = await req.body.title
    const remove = await Channel.findOneAndDelete({ _title: channel })
    if(remove!==undefined){
        res.json(`Channel ${channel} deleted`)
    } else {
        res.json(`Error`)
    } 
}))

//PATCH########################################
//Edit user
router.patch('/profile', async (req, res) => {
    try {
        const userMail = req.cookies.user;
        const updatedData = req.body.nick;

        const users = await User.findOne({ email: userMail });
        if (!users) {
            return res.status(404).json({ message: userMail });
          }
        users.set(updatedData);
        const updatedUser = await users.save();
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.patch('/admin/channel/:id', async (req, res) => {
    try {
        const channelId = req.params.id;
        const updatedData = req.body;

        const channels = await Channel.findById(channelId);
        if (!channels) {
            return res.status(404).json({ message: 'Channel not found' });
          }
        channels.set(updatedData);
        const updatedChannel = await channels.save();
        res.json(updatedChannel)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})




const getUserByEmail = (adress) => User.findOne({ email: adress });

module.exports = router