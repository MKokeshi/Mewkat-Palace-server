const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Token = require('../models/token')
const tokenMiddleware = require('../middlewares/token')


/**
 * @api {get} /review/ Request Reviews informations
 * @apiName GetReviews
 * @apiGroup Review
 *
 * @apiSuccessExample Success-Response:
 *
 *  [
    {
        "_id": "object-id",
        "token": "token",
        "stars": 5,
        "message": "message",
        "__v": 0
    },
    {
        "_id": "object-id",
        "token": "token",
        "stars": 5,
        "message": "message",
        "__v": 0
    }]
 *     
 *
**/
router.get('/', async (req, res) => {
    try {
      const review = await Review.find()
      res.json(review)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})



/**
 * @api {post} /review/ Create new review
 * @apiName CreateReview
 * @apiGroup Review
 * 
 * @apiParam {String} token Token.
 * @apiParam {Number} stars Review stars.
 * @apiParam {String} message Review message.
 *
 * @apiSuccess {ObjectId} _id id of the Review.
 * @apiSuccess {String} token Token of the Review.
 * @apiSuccess {Number} stars  Stars of the Review.
 * @apiSuccess {String} message  Message of the Review.
 *
 * @apiSuccessExample Success-Response:
 *     {
    "_id": "object-id",
    "token": "token",
    "stars": 5,
    "message": "message",
    "__v": 0
    }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Can't find token"
 *     }
 */
router.post('/',  tokenMiddleware.getTokenByValue, async (req, res) => {
    const review = new Review({
      token: req.body.token,
      stars: req.body.stars,
      message: req.body.message
    })
  
    try {
      const newReview = await review.save()
      await res.token.remove()
      res.status(201).json(newReview)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})


/**
 * @api {get} /review/:id Request Review informations
 * @apiName GetReview
 * @apiGroup Review
 *
 *
 * @apiSuccess {ObjectId} _id id of the Review.
 * @apiSuccess {String} token Token of the Review.
 * @apiSuccess {Number} stars  Stars of the Review.
 * @apiSuccess {String} message  Message of the Review.
 *
 * @apiSuccessExample Success-Response:
 *     {
    "_id": "object-id",
    "token": "token",
    "stars": 5,
    "message": "message",
    "__v": 0
    }
 *
 * @apiError ReviewNotFound The id of the Review was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find review"
 *     }
 */
router.get('/:id', getReview, (req, res) => {
    res.json(res.review)
})

/**
 * @api {delete} /review/:id Delete Review
 * @apiName DeleteReview
 * @apiGroup Review
 *
 * @apiParam {Number} id Review unique ID.
 *
 * @apiSuccess {String} message Deleted this Review.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find review"
 *     }
 */
router.delete('/:id', getReview, async (req, res) => {
    try {
      await res.review.remove()
      res.json({ message: 'Deleted This Review' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
})

/**
 * @api {put} /review/:id Edit Review
 * @apiName EditReview
 * @apiGroup Review
 *
 * @apiParam {Number} id Review unique ID.
 * @apiParam {String} token Review token (optional).
 * @apiParam {Number} stars Review stars (optional).
 * @apiParam {String} message Review message (optional).
 *
 * @apiSuccess {String} message Deleted this Review.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find review"
 *     }
 */
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