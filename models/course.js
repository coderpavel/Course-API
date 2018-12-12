const mongoose = require('mongoose');
const Joi = require('Joi');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})

const Course = mongoose.model('Course', courseSchema);

// Validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate= validateCourse;