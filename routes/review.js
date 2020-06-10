const express = require('express')
const router = express.Router()
const Review = require('../models/review')

// Get all Reviews
router.get('/', async (req, res) => {
    try {
      const review = await Review.find()
      res.json(review)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})


// Create a Review
router.post('/', async (req, res) => {
    const review = new Review({
      token: req.body.token,
      stars: req.body.stars,
      message: req.body.message
    })
  
    try {
      const newReview = await review.save()
      res.status(201).json(newReview)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

// Get a Review
router.get('/:id', getReview, (req, res) => {
    res.json(res.review)
})

// Delete a Review
router.delete('/:id', getReview, async (req, res) => {
    try {
      await res.review.remove()
      res.json({ message: 'Deleted This Review' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
})

// Update Review
router.patch('/:id', getReview, async (req, res) => {
    if (req.body.token != null) {
      res.subscriber.token = req.body.token
    }

    if (req.body.stars != null) {
        res.subscriber.stars = req.body.stars
    }

    if (req.body.message != null) {
        res.subscriber.message = req.body.message
    }

    try {
      const updatedReview = await res.review.save()
      res.json(updatedReview)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
})



async function getReview(req, res, next) {
    try {
      review = await Review.findById(req.params.id)
      if (review == null) {
        return res.status(404).json({ message: 'Cant find review'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.review = review
    next()
}

module.exports = router;