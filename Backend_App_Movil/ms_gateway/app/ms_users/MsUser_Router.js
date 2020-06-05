const express = require('express');
const router = express.Router();
const MsUserController = require('./MsUser_Controller');

router.post('/login', MsUserController.login);
router.post('/save', MsUserController.save);
router.post('/email',MsUserController.email);
router.post('/resetPassword', MsUserController.resetPassword);
router.get('/profile/:id',MsUserController.getUser);
router.put('/update/:id',MsUserController.update);
router.put('/change/:id',MsUserController.updatePassword);
router.put('/auth/:authid',MsUserController.updatePassword);
router.get('/users', MsUserController.getUsers);
router.get('/getDirections/:id',MsUserController.getDirectionsByUser);
router.get('/getDirection/:id',MsUserController.getOneDirection);
router.post('/saveDirection',MsUserController.saveDirection);
router.delete('/deleteDirection/:id',MsUserController.deleteDirection);


module.exports= router;