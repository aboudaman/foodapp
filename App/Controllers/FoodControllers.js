const FoodModel = require("../Models/FoodModel");

// Get Food List
exports.foodList = (req, res) => {
  FoodModel.find({})
    .then((foods) => {
      res.send(foods);
    })
    .catch((error) => {
      res.status(500).send("There was an error fetching the food list ", err);
    });
};

// Create new food
exports.create = (req, res) => {
  const { name, category, calories } = req.body;
  const foodObj = { name, category, calories };

  const newFood = new FoodModel(foodObj);
  newFood
    .save()
    .then((food) => res.send(`Created Success ${food}`))
    .catch((error) => res.send(`there was an error ${error}`));
};

// Find by ID
exports.findById = (req, res) => {
  const { id } = req.params;
  FoodModel.findById(id, (err, food) => {
    if (err) {
      res.send(`There was an error ${err}`);
    } else {
      res.send(food);
    }
  });
};

// Update Food

exports.updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  FoodModel.findByIdAndUpdate(id, { name: name }, (err, update) => {
    if (err) {
      res.send(`There was an error updating ${err}`);
    } else {
      res.send(`Update Success ${update}`);
    }
  });
};

// Delete Food
exports.delete = (req, res) => {
  const { id } = req.params;
  FoodModel.findByIdAndDelete(id)
    .then((food) => {
      res.send(`The food ${food} has been deleted`);
    })
    .catch((err) => {
      res.send(`There was an error deleting ${err}`);
    });
};
