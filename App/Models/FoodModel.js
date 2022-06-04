const { Schema, model } = require("mongoose");

const FoodSchema = new Schema({
  name: String,
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  calories: {
    type: Number,
    default: 0,
    validate: (value) => {
      if (value > 590) {
        throw new Error("That's a lot of calories");
      }
    },
  },
});

const Food = model("Food", FoodSchema);
module.exports = Food;
