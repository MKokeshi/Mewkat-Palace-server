const Token = require('../models/token')

async function getTokenById(req, res, next) {
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

async function getTokenByValue(req, res, next) {
    try {
        token = await Token.find({'token' : req.params.token})
        if (token == null) {
        return res.status(404).json({ message: 'Cant find token'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.token = token
    next()
}

module.exports.getTokenById = getTokenById
module.exports.getTokenByValue = getTokenByValue