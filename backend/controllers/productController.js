const Product = require('../models/productModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');


exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res
       .status(200)
       .json({
            status: 'success',
            total: products.length,
            data: {
                products
            }
       }) 
})

exports.getSpecificProduct = catchAsync(async (req, res, next) => {
    const specefitProduct = await Product.findById(req.params.id).populate({
        path: 'supplier',
        select: '-__v -_id'
    });

    if(!speceficProduct){
        return next(new AppError('No products found with the input credential(s)', 404))
    }

    res
       .status(200)
       .json({
            status: 'success',
            data: {
                speceficProduct
            }
       }) 

       next()

})

exports.createNewProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body)

    res
       .status(201)
       .json({
            status: 'success',
            data: {
                newProduct
            }
       }) 
})






