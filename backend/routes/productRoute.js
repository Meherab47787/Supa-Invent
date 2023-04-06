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



module.exports = router