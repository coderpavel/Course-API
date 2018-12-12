const mongoose = require('mongoose');
const Joi = require('joi');
const bodyParser = require('body-parser');
const courses = require('./routes/courses/courses');
const home = require('./routes/home/home');
const customers = require('./routes/customers/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/coursesApi', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port: ', port));