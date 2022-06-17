const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const verifyTokenMiddleware = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        console.log(`headers ${req.headers.authorization}`);

        const token = req.headers.authorization.split(" ")[1];
        console.log("Token ==> ", token);

        jwt.verify(
            token,
            process.env.secret || "aiuhfuwefpwefefb",
            (err, decode) => {
                if (err) {
                    res.send("Invalid user");
                }

                console.log("decode ==> ", decode);

                UserModel.findOne({ _id: decode.id }).exec((err, user) => {
                    if (err) {
                        res.send("Token has changed");
                    } else {
                        req.user = user;
                        next();
                    }
                });
            }
        );
    } else {
        // req.user = undefined;
        // next();
        res.send({ message: "unauthorised user attempt" });
    }
};

module.exports = verifyTokenMiddleware;