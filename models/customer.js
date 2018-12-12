const mongoose = require('mongoose');
const Joi = require('Joi');

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
        maxlength: 20
    }
});

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isVip: Joi.boolean(),
        phone: Joi.string().min(6).max(20).required()
    }
    return Joi.validate(customer, schema);
}

const Customer = mongoose.model('Customer', customerSchema);


exports.Customer = Customer;
exports.validate = validateCustomer;