const express = require('express');
const MsUserRouter = require('../ms_users/MsUser_Router');
const MsRestaurantRouter = require('../ms_restaurants/MsRestaurant_Router');
const MsMenuRouter = require('../ms_menus/MsMenu_Router');
const MsOrderRouter = require('../ms_orders/MsOrders_Router');
const MsPaymentRouter = require('../ms_payments/MsPayment_Router');
const MsSubscriptionRouter = require('../ms_subscription/MsSubscription_Router');
const MsNotificationRouter = require('../ms_notifications/MsNotification_Router');
const router = express.Router();
const token = require('../utils/Token');

router.use('/user', MsUserRouter);
router.use('/menu', MsMenuRouter);
router.use('/restaurant', MsRestaurantRouter);
router.use('/order', MsOrderRouter);
router.use('/payment', MsPaymentRouter);
router.use('/subscription', MsSubscriptionRouter);
router.use('/notification', MsNotificationRouter)

module.exports = router;