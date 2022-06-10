const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["normal", "admin"],
  },
});

const User = model("User", UserSchema);

module.exports = User;
