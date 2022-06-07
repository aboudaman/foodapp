const { default: mongoose } = require("mongoose");
const PersonModel = require("../Models/PersonModel");
const StoryModel = require("../Models/StoryModel");

// Create New Author
exports.create = (req, res) => {
  console.log("inside author");
  const { name, age, title } = req.body;

  const newAuthor = new PersonModel({
    _id: new mongoose.Types.ObjectId(),
    name: name,
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

      res.send("Author Saved!!");
    })
    .catch((error) => res.send(`Error Saving Author`));
};

// Get List of authors
exports.allauthors = (req, res) => {
    PersonModel.find({},'name')
        .then(name => res.send(`Names ==> \n ${name}`))
        .catch(err => res.send(`There was an error: ${err}`))

}

// Get List of authors and stories written
exports.authorstory = (req, res) => {
    const {title} = req.body
    console.log(title)

    StoryModel.find({})
    .select('title')
    .populate({path: 'author', select: 'name'})
    // .exec(function (err, story) {
    //     if (err)  return handleError(err);
    //     // console.log('The author is %s', story.author);
    //     res.send(`The author is ${story}`)
    //     // prints "The author is Ian Fleming"
    //   });
    .then(story => res.send(story))
    .catch(err => res.send(`There was an error retrieving author ${err}`))

}

// Get List of authors and stories written
exports.authorlist = (req, res) => {
    const {name} = req.body
    console.log(name)

    PersonModel.find({})
    .populate({path: 'stories', select: 'title'})
    // .exec(function (err, story) {
    //     if (err)  return handleError(err);


    //     // console.log('The author is %s', story.author);
    //     res.send(`The author is ${story.author[0].name}`)
    //     // prints "The author is Ian Fleming"
    //   });
    .then(person => res.send(person))
    .catch(err => res.send(`There was an error retrieving author ${err}`))

}

// Delete an author by id
exports.delete = (req, res) => {
    const {id} = req.params
    console.log(id)
    PersonModel.findByIdAndDelete(id)
    .then(() => res.send('deleted'))
    .catch(error => res.send(`Error ${error}`))
}

// Find by id
exports.findById = (req, res) => {
    const {id} = req.params
    
    PersonModel.findByIdAndDelete(id).exec()
    StoryModel.find({'author':id})
        .then((story) => {
            console.log(`${story[0]._id}`)
            StoryModel.findByIdAndDelete(story[0]._id).exec()
        })
        .catch(err => console.log(err))

    // PersonModel.findById(id)
    // .then((person) => {
    //     // res.send(person)
    //     StoryModel.find({'author':id})
    //     .then((story) => console.log(`${story} and ${person}`))
    //     .catch(err => console.log(err))
    
    res.send('All records deleted!!!')
    
    // })
    // .catch(error => res.send(`Error ${error}`))
    // res.send('completed')
}

// Get list of stories
exports.stories = (req, res) => {
    StoryModel.find({})
        .then(stories => res.send(stories))
        .catch(err => res.send(err))
}