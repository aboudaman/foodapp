const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const res = require("express/lib/response");
const FoodRoutes = require("./App/Routes/FoodRoutes");
const PersonRoutes = require("./App/Routes/PersonRoutes")
const app = express();

// Setup DB
mongoose.connect("mongodb://localhost:27017/fooddb");

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error Connecting");
});

db.on("open", () => {
  console.log("Connected to DB");
});

const logger = (req, res, next) => {
  req.logger = Date.now();
  // console.log(`Request came ${Date.now()}`)
  next();
};

app.use(logger);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Load Routes
app.use(FoodRoutes);
app.use(PersonRoutes)

app.listen(8080, () => {
  console.log("Server is running");
});
