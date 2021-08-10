const jwt = require("jsonwebtoken")
const User = require("../models/user")
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRIT)
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })

        console.log(decoded)
        if (!user) {
            throw new Error('unable to authenticated')
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: "please Authenticate" })
    }

}

module.exports = auth