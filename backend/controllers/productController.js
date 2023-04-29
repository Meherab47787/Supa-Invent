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
            products
       }) 
})

exports.getSpecificProduct = catchAsync(async (req, res, next) => {
    const speceficProduct = await Product.findById(req.params.id).populate({
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

    

    let fileData = {};
    if(req.file) {
        fileData = {
            fineName: req.file.originalName,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size
        }
    }

    const newProduct = await Product.create({
        productName: req.body.productName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        arrivalDate: req.body.arrivalDate,
        productImage: fileData
    })

    res
       .status(201)
       .json({
            status: 'success',
            data: {
                newProduct
            }
       }) 
})

exports.deleteProduct = catchAsync(async (req, res, next) => {

    const deleteProduct = await Product.findById(req.params.id)
    if(!deleteProduct){
        next(new AppError('The product doesnot exist', 404))
    }

    await deleteProduct.remove()

    res
       .status(200)
       .json({
        status: 'success',
        data: {
            message: `product '${deleteProduct.productName}' deleted`
        }
       })

})


exports.updateProduct = catchAsync(async (req, res, next) =>{
    res.send('Update Product')
})






