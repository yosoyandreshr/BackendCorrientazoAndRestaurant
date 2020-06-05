const express = require('express');
const router = express.Router();
const MsPaymentController = require('./MsPayment_Controller');

router.post('/create', MsPaymentController.create);
router.post('/success', MsPaymentController.success);
router.post('/createPayment', MsPaymentController.createPayment);
router.get('/getAll/:userId', MsPaymentController.getPayment);
router.post('/createPaymentDetail', MsPaymentController.createPaymentDetail);
router.get('/getDetailAll/:paymentId', MsPaymentController.getPaymentDetail);

module.exports = router;