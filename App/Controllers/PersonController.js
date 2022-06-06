const { default: mongoose } = require("mongoose");
const PersonModel = require("../Models/PersonModel");
const StoryModel = require("../Models/StoryModel");

// Create New Author
exports.create = (req, res) => {
  const { name, age, title } = req.body;
  const newAuthor = new PersonModel({
    _id: new mongoose.Types.ObjectId(),
    name: "name",
    age: age,
  });

  newAuthor
    .save()
    .then((author) => {
      const newStory = new StoryModel({
        title: title,
        author: author._id,
      });

      newStory
        .save()
        .then((story) => {})
        .catch((err) => res.send(`Error saving story ${err}`));
    })
    .catch((error) => res.send(`Error Saving Author`));
};
