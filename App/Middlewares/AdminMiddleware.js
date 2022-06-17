const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const adminMiddleware = (req, res, next) => {
    console.log('req user', req.user.role)
    if (req.user.role === 'admin') {
        next()
    } else {
        res.send({ message: "You are not authorised" })
    }

};

module.exports = adminMiddleware;