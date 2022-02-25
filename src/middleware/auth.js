const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')

const authenticated = (req, res, next) => {

    const jwt = req.headers["authorization"]
    jsonwebtoken.verify(jwt, process.env.ACCESS_SECRET_KEY, (err, userInfo) => {
        if (err) {
            res.status(403).json({ err: "You are not authenticated " }).end()
            return
        }

        delete userInfo.password
        req.userInfo = userInfo

        //Verifica se o usuário existe

        next()
    })
}

module.exports = authenticated