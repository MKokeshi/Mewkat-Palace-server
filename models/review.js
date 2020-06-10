const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    token: {
      token: String,
      required: true
    },
    stars:{
        stars: Number,
        required: true
    },
    message:{
        message: String,
        required: false
    }
})


module.exports = mongoose.model('Review', reviewSchema)