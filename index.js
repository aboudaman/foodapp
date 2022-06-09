const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const res = require("express/lib/response");
const path = require('path')
const FoodRoutes = require(path.join(__dirname,"./App/Routes/FoodRoutes"));
const PersonRoutes = require(path.join(__dirname,"./App/Routes/PersonRoutes"))
const favicon = require('express-favicon');
const cors = require('cors')
const app = express();

// Setup DB


// const url = "process.env.MONGODBURL"
mongoose.connect(process.env.MONGODB ||"mongodb+srv://admin:Xe7RY2hTeWx2hrTM@cluster0.tnpbjpn.mongodb.net/fooddb?retryWrites=true&w=majority");

// mongoose.connect("mongodb://localhost:27017/fooddb");
// console.log(__dirname)

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(`Error Connecting ${err}`);
});

db.on("open", () => {
  console.log("Connected to DB");
});

const logger = (req, res, next) => {
  req.logger = Date.now();
  // console.log(`Request came ${Date.now()}`)
  next();
};
// console.log(path.join(__dirname,'./favicon.png'))
// Middlewares
// app.use(favicon(__dirname + '/favicon.png'))
app.use(favicon(path.join(__dirname,'./favicon.png')))

app.use(cors({
  origin:"*"
}))

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
