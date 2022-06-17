const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");
const jwt = require('jsonwebtoken')

// signup user
exports.register = (req, res) => {
    const { fullName, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new UserModel({
        fullName: fullName,
        email: email,
        password: hashedPassword,
        role: role,
    });

    newUser
        .save()
        .then((user) => {
            res.status(201).send({ message: "User Saved" });
        })
        .catch((error) =>
            res.send({ message: "There was an error saving the user" })
        );
};

// login user
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    UserModel.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(404).send({ message: "User Not Found" })
            }

            // Check if password matches
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                res.send({ message: "Passwords do not match", accessToken: null });
            }

            console.log(user.id)

            const token = jwt.sign({
                id: user.id,

            }, process.env.secret || 'aiuhfuwefpwefefb')

            //   log user
            res.status(200).send({
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                },
                accessToken: token
            })

        })
        .catch((error) => res.send({ message: "User does not exist" }));
};