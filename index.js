const Joi = require('joi');
const bodyParser = require('body-parser');
const courses = require('./routes/courses/courses');
const home = require('./routes/home/home');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port: ', port));