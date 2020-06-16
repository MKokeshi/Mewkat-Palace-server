const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    token: {
      type: String,
      unique: true,
      required: true
    },
    stars: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    like: {
        type: Number,
        required: true
    },
    dislike: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Review', reviewSchema)