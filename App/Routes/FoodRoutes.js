const express = require("express");
const path = require("path");
const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const AdminAuthMiddleware = require('../Middlewares/AdminMiddleware')
const FoodController = require(path.join(
    __dirname,
    "../Controllers/FoodControllers"
));

const app = express();
app.use(AuthMiddleware)
    // Get Food List
app.get("/foodlist", FoodController.foodList);
// Find by ID
app.get("/food/:id", FoodController.findById);
// Create New Food
app.post("/food", AdminAuthMiddleware, FoodController.create);
// Update by ID
app.put("/food/:id", AdminAuthMiddleware, FoodController.updateById);
// Delete
app.delete("/food/:id", AdminAuthMiddleware, FoodController.delete);

module.exports = app;