const {Schema, model} = require('mongoose')

const PersonSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number, 
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]

})

const Person = model('Person', PersonSchema)

module.exports = Person