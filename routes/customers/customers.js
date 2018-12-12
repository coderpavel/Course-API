const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 11
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isVip: req.body.isVip
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isVip: req.body.id,
        phone: req.body.phone
    },
    { new: true });

    if(!customer) return res.status(404).send('There is no client with such ID');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).status('There is no client with such ID');

    res.send(customer);
});

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isVip: Joi.boolean(),
        phone: Joi.string().min(6).max(11).required()
    }
    return Joi.validate(customer, schema);
}

module.exports = router;