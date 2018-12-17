const mongoose = require('mongoose');
const Joi = require('Joi');
const { genreSchema } = require('../models/genre');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Course = mongoose.model('Course', courseSchema);

// Validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).max().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    
    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;