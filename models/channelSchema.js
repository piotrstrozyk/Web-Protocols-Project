const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    users: {
        type: Array,
        required: true,
        default: []
    }
})


module.exports = mongoose.model('Channel', channelSchema, 'channels')