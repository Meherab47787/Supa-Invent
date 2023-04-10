const mongoose = require('mongoose');
const validator = require('validator');


const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name']
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide your email']
    },

    logo: {
        type: String
    },

    phone: {
        type: String,
        require: true
    },
});



const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;