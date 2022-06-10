const {Schema, model} = require('mongoose')

const StorySchema = new Schema({
    author:[{type: Schema.Types.ObjectId, ref: 'Person'}],
    title: String,
    fans:[{type: Schema.Types.ObjectId, ref: 'Person'}]
})

const Story = model('Story', StorySchema)

module.exports = Story