const Joi = require('joi');
const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            isVip: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const validateRental = (rental) => {
    const Schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required()
    };
    return Joi.validate(rental, schema);
}


const Rental = mongoose.model('Rental', RentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;