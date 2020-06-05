const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();


router.post('/Subs', subscriptionController.createSubscription);
router.get('/Subs/getByUser/:userId', subscriptionController.getSubsByUser);

router.get('/Subs/getBalance/:subId', subscriptionController.getBalance);

router.get('/Subs/getByRestaurant/:restId', subscriptionController.getSubsByRestaurant);
router.get('/Subs/getOne/:subId', subscriptionController.getOneSubscription);

router.post('/packages', subscriptionController.createPackage);
router.get('/packages/getOne/:packageId', subscriptionController.getOnePackage);
router.get('/packages/getPacksByRestaurant/:restId', subscriptionController.getPacksByRestaurant);
router.put('/Subs/updateBalance/:subId', subscriptionController.updateBalance);
router.put('/packages/updatePackage/:packageid', subscriptionController.updateStatePackage);


module.exports = router;
