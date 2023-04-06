const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router
      .route('/register')
      .post(userController.registerUser);

router
      .route('/login')
      .post(userController.login);

router
      .route('/forgotPassword')
      .post(userController.forgotPassword);

router            
      .route('/resetPassword/:token')
      .patch(userController.resetPassword);

router 
      .route('/logout')
      .get(userController.logout);

      
router 
      .route('/loggedStatus')
      .get(userController.loggedStatus)




module.exports = router;