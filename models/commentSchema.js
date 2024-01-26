const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    channel: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})


module.exports = mongoose.model('Comment', commentSchema, 'comments')