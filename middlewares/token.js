const Token = require('../models/token')

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

module.exports.getToken = getToken