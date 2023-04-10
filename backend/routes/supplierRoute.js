const express = require('express');
const supplierController = require('../controllers/supplierController')

const router = express.Router();

router  
      .route('/getallSuppliers')
      .get(supplierController.getAllSuppliers)

router
      .route('/addSupplier')
      .post(supplierController.createSupplier)






module.exports = router;      