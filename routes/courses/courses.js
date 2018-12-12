const mongoose = require('mongoose');
const Joi = require('joi');
const { validate, Course } = require('../../models/course');;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = new Course({ name: req.body.name });
    course = await course.save();

    res.send(course);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    
    if (!course) return res.status(404).send('There is no course with this ID ');
    
    res.send(course);
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.papams.id, { name: req.body.name }, { new: true });
    if (!course) return res.status(404).send('Thre is no course with this ID');

    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);

    if (!course) return res.status(404).send('There is no course with such id');

    res.send(course);
});



module.exports = router;