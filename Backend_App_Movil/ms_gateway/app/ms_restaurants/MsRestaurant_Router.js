const express = require('express');
const router = express.Router();
const MsRestaurantController = require('./MsRestaurant_Controller');

router.post('/login', MsRestaurantController.login);
router.post('/save', MsRestaurantController.save);
router.post('/resetPassword', MsRestaurantController.resetPassword);
router.put('/updatePassword/:authid', MsRestaurantController.updatePassword);
router.get('/listRestByCity/:city', MsRestaurantController.getRestByCity);
router.get('/listRestByName/:name', MsRestaurantController.getRestByName);
router.get('/list', MsRestaurantController.getRestaurant);
router.get('/list/:restId', MsRestaurantController.getrestid);
router.get('/list/authId/:authId', MsRestaurantController.getRestByAuthId);
router.get('/bill/list/:restId' , MsRestaurantController.getOneRestaurant)
router.put('/update/:id',MsRestaurantController.update);

module.exports = router;