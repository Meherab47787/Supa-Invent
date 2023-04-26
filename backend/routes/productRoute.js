const express = require('express');
const productController = require('../controllers/productController');
const Authentication = require('../controllers/userController');
const upload = require('../util/fileUpload')


const router = express.Router();

router
     .route('/getAllProducts')
     .get(Authentication.protect, productController.getAllProducts);

router  
      .route('/createProduct')
      .post(Authentication.protect, upload.single('productImage'), productController.createNewProduct);

router
      .route('/getProduct/:id')
      .get(Authentication.protect, productController.getSpecificProduct)

router
      .route('/deleteProduct/:id')
      .delete(Authentication.protect, productController.deleteProduct)

router
      .route('/updateProduct/:id')
      .patch(Authentication.protect, productController.updateProduct)





module.exports = router