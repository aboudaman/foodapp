const {Schema, model} = require('mongoose')
const path = require('path')
const Story = require(path.join(__dirname,'./StoryModel'))

const PersonSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number, 
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]

})

const Person = model('Person', PersonSchema)

module.exports = Person