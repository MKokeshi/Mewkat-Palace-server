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
    }
})


module.exports = mongoose.model('Review', reviewSchema)