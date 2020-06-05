const { Router } = require('express');

const router = Router();
const PaymentController = require('../controllers/PaymentController');
const PaymentDetailController = require('../controllers/PaymentDetailControllers');

router.post('/paymentSave', PaymentController.create);
router.get('/payment/success', PaymentController.success);


router.get('/get/:userId', PaymentController.getPayment);
router.post('/payment', PaymentController.createPayment);
router.post('/paymentDetail', PaymentDetailController.createPaymentDetail);
router.get('/getDetail/:paymentId', PaymentDetailController.getPaymentDetail);

module.exports = router;
