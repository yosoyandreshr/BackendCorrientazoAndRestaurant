const express = require('express');
const router = express.Router();
const MsMenuController = require('./MsMenu_Controller');

router.get('/list/:restId', MsMenuController.getRestId);
router.get('/option/:menuId', MsMenuController.getRestIdMenu);
router.get('/SubOption/:optionId', MsMenuController.getRestIdMenu);
router.get('/Options/:menuid', MsMenuController.getOptions);
router.post('/menu/createMenu', MsMenuController.createMenu);
router.post('/menu/createOption', MsMenuController.createOption);
router.post('/menu/createSubOption', MsMenuController.createSubOpcion);
router.delete('/menu/deleteSubOption/:subid', MsMenuController.deleteSubOption);
router.put('/menu/updateMenu/:menuid', MsMenuController.updateMenu);

module.exports = router;