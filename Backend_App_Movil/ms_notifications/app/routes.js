const express = require('express');
const notificationController = require('./controllers/notificationController');

const router = express.Router();

router.get('/notification/:idUser', notificationController.get);
router.post('/notification', notificationController.save);
router.put('/notification/:idUser', notificationController.update);

module.exports = router;
