const express = require('express')
const router = express.Router()
const Token = require('../models/token')

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
router.get('/:id', getToken, (req, res) => {
    res.json(res.token)
})

// Delete one Token
router.delete('/:id', getToken, async (req, res) => {
    try {
      await res.token.remove()
      res.json({ message: 'Deleted This Token' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
})

// Update Token
router.patch('/:id', getToken, async (req, res) => {
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


async function getToken(req, res, next) {
    try {
      token = await Token.findById(req.params.id)
      if (token == null) {
        return res.status(404).json({ message: 'Cant find token'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.token = token
    next()
}


module.exports = router;