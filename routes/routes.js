const express = require('express');
const router = express.Router();
const User = require('../models/model.js')

//Getting all
router.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting One
router.get('/:id', (req, res) => {
    res.send(req.user)
})
//Creating One
router.post('/', async (req, res) => {
    const user = new User({
        "name": req.body.name,
        "surname": req.body.surname,
        "nick": req.body.nick,
        "password": req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }   catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Updating One
router.patch('/:id', (req, res) => {
    // res.user
})
//Deleting One
router.delete('/:id', (req, res) => {
    // res.user
})

// async function getUser(req, res, next) {
//     let user
//     try {
//         user = await User.findOne({id: req.params.id})
//         if (user == null){
//             return res.status(404).json({message: "No user"})
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
//     res.user = user
//     next()
// }
module.exports = router