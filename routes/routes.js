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



const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');

};




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
    


//###################GET
router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.json({ message: 'Logout successful' });
  });

  router.get('/allusers', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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

router.delete('/api/channels/:name', async (req, res) => {
    const channelNamePattern = new RegExp(req.params.name, 'i'); // Ignoruj wielkość liter
    try {
      const result = await Channel.deleteMany({ title: channelNamePattern });
      res.json({ deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//PATCH########################################
//Edit user
router.patch('/profile', async (req, res) => {
    try {
        const userMail = req.body.email;
        const updatedData = req.body;

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

router.get('/search', async (req, res) => {
    try {
      const searchPattern = req.query.pattern; // Pobierz wzorzec z zapytania
  
      // Użyj RegExp do tworzenia dynamicznego wzorca wyszukiwania (niezapominaj o zabezpieczeniach przed RegExp Injection)
      const regexPattern = new RegExp(searchPattern, 'i');
  
      // Wyszukaj użytkowników, których pola pasują do wzorca
      const users = await User.find({
        $or: [
          { name: regexPattern },
          { surname: regexPattern },
          { nick: regexPattern },
          { email: regexPattern },
        ],
      });
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



const getUserByEmail = (adress) => User.findOne({ email: adress });

module.exports = router