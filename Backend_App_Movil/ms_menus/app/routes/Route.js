const { Router } = require('express');
const MenuController = require('../controllers/MenuController');
const OptionController = require('../controllers/OptionController');
const SubOptionController = require('../controllers/SubOptionController');

const router = Router();

router.post('/newMenu', MenuController.postMenu);
router.post('/newMenu/newOption', OptionController.postOption);
router.post('/newMenu/newSubOption/', SubOptionController.postSubOption);
router.put('/menu/update/:menuid', MenuController.putMenu);
router.get('/menu/:restId', MenuController.getRestId);
router.get('/menu/option/:menuId', MenuController.getRestIdMenu);
router.get('/menu/subOption/:optionId', MenuController.getSubOptionsByoptionId);
router.get('/menu/Options/:menuId', MenuController.getOptionsBymenuId);
router.delete('/menu/subOption/:subid', MenuController.deleteSubOption);




module.exports = router;
