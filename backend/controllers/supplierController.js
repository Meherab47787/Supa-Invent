const Supplier = require('../models/supplierModel')
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');


exports.getAllSuppliers = catchAsync(async (req, res, next) => {
    const suppliers = await Supplier.find();

    res
       .status(200)
       .json({
           status: 'success',
           total: suppliers.length,
           suppliers
        })
        
    next()    
})


exports.createSupplier = catchAsync(async (req, res, next) => {
    const newSupplier = await Supplier.create(req.body)

    res
       .status(201)
       .json({
            status: 'success',
            data: {
                newSupplier
            }
       }) 

})