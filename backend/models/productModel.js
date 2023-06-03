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

    arrivalDate: {
        type: Date,
        default: Date.now
    },

    productImage: {
        type: Object,
        default: {}
    },

    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: 'Supplier'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product