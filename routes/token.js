const express = require('express')
const router = express.Router()
const Token = require('../models/token')
const tokenMiddleware = require('../middlewares/token')

/**
 * @api {get} /tokens/ Request Tokens
 * @apiName GetTokens
 * @apiGroup Token
 *
 * @apiSuccessExample Success-Response:
 *
 *  [
    {
        "_id": "object-id",
        "token": "token",
        "name": "Lorenzo",
        "lastname": "Catania",
        "__v": 0
    },
    {
        "_id": "object-id",
        "token": "token",
        "name": "Lorenzo",
        "lastname": "Catania",
        "__v": 0
    }]
 *     
 *
**/
router.get('/', async (req, res) => {
    try {
      const tokens = await Token.find()
      res.json(tokens)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})


/**
 * @api {post} /tokens/ Create new token
 * @apiName CreateToken
 * @apiGroup Token
 * 
 * @apiParam {String} token Token.
 * @apiParam {String} name Name.
 * @apiParam {String} lastname Lastname.
 *
 * @apiSuccess {ObjectId} _id id of the Token.
 * @apiSuccess {String} token Token.
 * @apiSuccess {String} name Name.
 * @apiSuccess {String} lastname Lastname.
 *
 * @apiSuccessExample Success-Response:
 *     {
    "_id": "object-id",
    "token": "token",
    "name": "Lorenzo",
    "lastname": "Catania"
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
router.post('/', async (req, res) => {
    const token = new Token({
      token: req.body.token,
      name: req.body.name,
      lastname: req.body.lastname
    })
  
    try {
      const newToken = await token.save()
      res.status(201).json(newToken)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

/**
 * @api {get} /tokens/:id Request Token informations
 * @apiName GetToken
 * @apiGroup Token
 *
 *
 * @apiSuccess {ObjectId} _id id of the Review.
 * @apiSuccess {String} token Token.
 * @apiSuccess {String} name Name.
 * @apiSuccess {String} lastname Lastname.
 *
 * @apiSuccessExample Success-Response:
 *     {
    "_id": "object-id",
    "token": "token",
    "name": "Lorenzo",
    "lastname": "Catania",
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
router.get('/:id', tokenMiddleware.getTokenById, (req, res) => {
    res.json(res.token)
})


/**
 * @api {delete} /tokens/:id Delete Token
 * @apiName DeleteToken
 * @apiGroup Token
 *
 * @apiParam {Number} id Review unique ID.
 *
 * @apiSuccess {String} message Deleted this Token.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find token"
 *     }
 */
router.delete('/:id', tokenMiddleware.getTokenById, async (req, res) => {
    try {
      await res.token.remove()
      res.json({ message: 'Deleted This Token' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
})

/**
 * @api {put} /tokens/:id Edit Token
 * @apiName EditToken
 * @apiGroup Token
 *
 * @apiParam {Number} id Review unique ID.
 * @apiParam {String} token Token (optional).
 * @apiParam {String} name Name (optional).
 * @apiParam {String} lastname Lastname (optional)
 * 
 * @apiParam {Number} id Token unique ID.
 * @apiParam {String} token Token.
 * @apiParam {String} name Name.
 * @apiParam {String} lastname Lastname.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find token"
 *     }
 */
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