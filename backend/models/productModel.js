const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    productName: {
        type: String,
        require: true,
        unique: true
    },

    quantity: {
        type: Number,
        require: true
    },

    unitPrice: {
        type: Number,
        require: true
    },

    supplier: {
        type: Number
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product