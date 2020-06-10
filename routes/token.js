const express = require('express')
const router = express.Router()
const Token = require('../models/token')

// Get all tokens
router.get('/', async (req, res) => {
    try {
      const tokens = await Token.find()
      res.json(tokens)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Create one token
router.post('/', async (req, res) => {
    const token = new Token({
      token: req.body.token,
    })
  
    try {
      const newToken = await token.save()
      res.status(201).json(newToken)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

module.exports = router;