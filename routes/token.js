const express = require('express')
const router = express.Router()
const Token = require('../models/token')
const tokenMiddleware = require('../middlewares/token')

// Get all Tokens
router.get('/', async (req, res) => {
    try {
      const tokens = await Token.find()
      res.json(tokens)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Create one Token
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

// Get One Token
router.get('/:id', tokenMiddleware.getTokenById, (req, res) => {
    res.json(res.token)
})

// Delete one Token
router.delete('/:id', tokenMiddleware.getTokenById, async (req, res) => {
    try {
      await res.token.remove()
      res.json({ message: 'Deleted This Token' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
})

// Update Token
router.patch('/:id', tokenMiddleware.getTokenById, async (req, res) => {
    if (req.body.token != null) {
      res.subscriber.token = req.body.token
    }
    try {
      const updatedToken = await res.token.save()
      res.json(updatedToken)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
})

module.exports = router;