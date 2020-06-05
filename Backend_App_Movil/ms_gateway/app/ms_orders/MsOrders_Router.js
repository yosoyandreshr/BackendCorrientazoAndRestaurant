const express =require('express');
const router = express.Router();
const MsOrdersController = require('./MsOrders_Controller');
const token  = require('../utils/Token');

router.get('/bill',MsOrdersController.getOrders);
router.get('/getBillAll',MsOrdersController.getOrderAll);
router.get('/getOrderAllBasket/:userId',MsOrdersController.getOrderAllBasket);
router.get('/getOrderAllOrderId/:orderId',MsOrdersController.getOrderAllOrderId);
router.get('/getOrderAllBasket',MsOrdersController.getOrderAllBasket);
router.get('/getOrdersByRestaurant/:restId', MsOrdersController.getOrdersByRestaurant);
router.get('/ordersActive/:id', MsOrdersController.getDetailOrdersActive);
router.get('/ordersDetail/:id', MsOrdersController.getDetailOrders);
router.post('/bill/list/:id',MsOrdersController.getOrderByUser);
router.post('/createBill', MsOrdersController.createOrder);
router.post('/createBillDetail', MsOrdersController.creaOrderDetail);
router.put('/updateOrder/:id', MsOrdersController.update);
router.put('/orderPayment/:userId',MsOrdersController.updatePayment);
router.put('/orderDetail/:detailId',MsOrdersController.updateOrderDetail);
router.delete('/deleteDetail/:detailId',MsOrdersController.deleteOrderDetail);
router.delete('/deleteOrderId/:orderId',MsOrdersController.deleteOrderId);

module.exports = router;


