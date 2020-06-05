const express = require('express');
const router = express.Router();
const MsNotificationController = require('./MsNotification_Controller');

router.post('/saveToken', MsNotificationController.saveTokenDevice);
router.put('/updateTokenDevice/:id', MsNotificationController.updateTokenDevice);
router.get('/sendNotification/:id', MsNotificationController.sendToken);

module.exports = router;