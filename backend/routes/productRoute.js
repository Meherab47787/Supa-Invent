const express = require('express');
const productController = require('../controllers/productController');
const Authentication = require('../controllers/userController')


const router = express.Router();

router
     .route('/getAllProducts')
     .get(Authentication.protect, productController.getAllProducts);

router  
      .route('/createProduct')
      .post(productController.createNewProduct);

router
      .route('/getProduct/:id')
      .get(Authentication.protect, productController.getSpecificProduct)

router
      .route('/deleteProduct/:id')
      .delete(Authentication.protect, productController.deleteProduct)




module.exports = router