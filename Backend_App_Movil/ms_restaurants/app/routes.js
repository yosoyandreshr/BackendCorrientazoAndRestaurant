const express = require('express');
const restaurantController = require('./controllers/restaurantController');
const stateController = require('./controllers/stateController');
const authController = require('../app/controllers/authController');

const router = express.Router();

router.get('/Restaurant', restaurantController.getrestaurant);
router.get('/Restaurant/:restid', restaurantController.getrest);
router.get('/Restaurant/findByCity/:city', restaurantController.getByCity);
router.get('/Restaurant/findByName/:name', restaurantController.getByName);
router.get('/Restaurant/listAuthId/:authId', restaurantController.getRestByAuthId);


router.post('/Restaurant', restaurantController.post);
router.put('/Restaurant/update/:restid', restaurantController.put);
router.get('/Restaurant/auth/:authid', restaurantController.findAuthIdByUserId);
router.post('/Restaurant/resetPassword', restaurantController.resetPassword);

router.post('/State', stateController.post);
router.get('/State/:stateid', stateController.get);
router.get('/States', stateController.getstate);
router.put('/Update/:stateid', stateController.put);

router.post('/login', authController.login);
router.put('/auth/update/:authid', authController.update);
router.get('/auth/:authemail', authController.getAuthIdByEmail);


module.exports = router;
