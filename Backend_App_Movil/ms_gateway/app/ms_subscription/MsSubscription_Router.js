const express = require('express');
const router = express.Router();
const MsSubscriptionController = require('./MsSubscription_Controller');

router.post('/createSubscription', MsSubscriptionController.createSubscription);
router.post('/createPackage',MsSubscriptionController.createPackage);
router.get('/getSubsByRestaurant/:restId', MsSubscriptionController.getSubsByRestaurant);
router.get('/getBalance/:subId', MsSubscriptionController.getBalance);
router.put('/updateBalance/:subId', MsSubscriptionController.updateBalance);
router.put('/updatePackage/:packageid', MsSubscriptionController.updatePackage);
router.get('/getSubsByUser/:userId', MsSubscriptionController.getSubsByUser);
router.get('/getOneSubscription/:subId',MsSubscriptionController.getOneSubscription);
router.get('/getOnePackage/:packageId', MsSubscriptionController.getOnePackage);
router.get('/getPacksByRestaurant/:restId', MsSubscriptionController.getPacksByRestaurant);

module.exports = router;