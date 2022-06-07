const express = require('express')
const PersonController = require('../Controllers/PersonController')
const app = express()

// Route to create new Person
app.post('/person', PersonController.create)
app.get('/authors', PersonController.allauthors)
app.get('/authorstory', PersonController.authorstory)
app.get('/authorlist', PersonController.authorlist)
app.get('/stories', PersonController.stories)
app.get('/author/delete/:id', PersonController.delete)
app.get('/author/:id', PersonController.findById)

module.exports = app