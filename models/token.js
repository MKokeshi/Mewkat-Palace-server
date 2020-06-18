const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token: {
      type: String, 
      unique:true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
})


module.exports = mongoose.model('Token', tokenSchema)