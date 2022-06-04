const express = require("express");
const FoodController = require("../Controllers/FoodControllers");
const app = express();
const FoodModel = require("../Models/FoodModel");

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
