const express = require("express");

const path = require("path");
const UserController = require(path.join(
    __dirname,
    "../Controllers/UserController"
));
const app = express();

// Register a new user
app.post("/register", UserController.register);
// Login
app.post("/login", UserController.login);

module.exports = app;