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
        type: mongoose.Schema.ObjectId,
        ref: 'Supplier'
    },

    arrivalDate: {
        type: Date,
        default: Date.now
    },

    productImage: {
        type: Object,
        default: {}
    }
})


// productSchema.pre('save', async function(next){

//     const supplier = await Supplier.findById(this.supplier)

//     this.supplier = supplier

//     next()
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product