const express = require("express");
const path = require("path");
const FoodController = require(path.join(
  __dirname,
  "../Controllers/FoodControllers"
));
const app = express();
const FoodModel = require(path.join(__dirname, "../Models/FoodModel"));

app.get("/foodlist", FoodController.foodList);

// Create New Food
app.post("/food", FoodController.create);

// Find by ID
app.get("/food/:id", FoodController.findById);

// Update by ID
app.put("/food/:id", FoodController.updateById);

// Delete
app.delete("/food/:id", FoodController.delete);

module.exports = app;
