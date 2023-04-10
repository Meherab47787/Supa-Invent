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






