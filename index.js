const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const courses = [
    { id: 1, name: 'course_1' },
    { id: 2, name: 'course_2' },
    { id: 3, name: 'course_3' }
];

app.get('/', (req, res) => {
    res.send('Welcome to the course Api');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('There is no course with this ID ');
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Thre is no course with this ID');

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('There is no course with such id');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// Validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}




const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port: ', port));