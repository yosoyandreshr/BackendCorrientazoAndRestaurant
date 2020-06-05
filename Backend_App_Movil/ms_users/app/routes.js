const express = require('express');
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');
const authController = require('./controllers/authController');
const emailController = require('./controllers/emailController');
const directionController = require('./controllers/directionController');

const router = express.Router();


router.post('/login', authController.login);
router.post('/users', userController.save);
router.post('/users/direction', directionController.createDirection);
router.post('/resetPassword', userController.resetPassword);
router.post('/email', emailController.sendEmail);
router.post('/roles', roleController.save);

router.get('/users/:userid', userController.findByUserId);
router.get('/users/auth/:authid', userController.findAuthIdByUserId);
router.get('/users/directions/:userid', directionController.getDirectionsByUser);
router.get('/users/direction/:directionid', directionController.getOneDirection);
router.get('/auth/:authemail', authController.getAuthIdByEmail);

router.put('/users/:userid', userController.updateUser);
router.put('/auth/update/:authid', authController.update);


module.exports = router;
