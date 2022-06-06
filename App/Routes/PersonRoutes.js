const express = require('express')
const PersonController = require('../Controllers/PersonController')
const app = express()

// Route to create new Person
app.get('/person', PersonController.create)