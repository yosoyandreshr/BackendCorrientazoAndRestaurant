const express = require('express');
const OrdersController = require('./controllers/OrdersControllers');
const detailOrdersController = require('./controllers/detailOrdersControllers');

const router = express.Router();

router.post('/order/:idUsers', OrdersController.getOne); // ✓
router.get('/order/restaurant/:restId', OrdersController.getOneRestaurant); // ✓
router.delete('/orderIdDelete/:orderId', OrdersController.deleteOrders); // ✓
router.put('/orders/update/:idOrder', OrdersController.updateOrder); // ✓
router.put('/orderPayment/:userId', OrdersController.updatePayment); // ✓
router.get('/detailOrdersActive/:orderId', detailOrdersController.getdetailorderActive);// ✓
router.post('/orders', OrdersController.createOrder); // ✓
router.post('/detailOrders', detailOrdersController.createOrderDetail); // ✓
router.get('/orderAll/:userId', OrdersController.getOrderAll);// ✓
router.get('/orderAllOrderId/:orderId', OrdersController.getOrderAllOrderId); // ✓
router.get('/orderDetail/:orderId', detailOrdersController.getOrderDetailId); // ✓
router.get('/detailOrders/:orderId', detailOrdersController.getdetailOrder); // ✓
router.put('/detailOrderId/:detailId', detailOrdersController.updateOrderDetail);
router.delete('/orderDetail/:detailId', detailOrdersController.deleteOrderDetail);// ✓

module.exports = router;
