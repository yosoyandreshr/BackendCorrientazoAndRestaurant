const MenuRepository = module.exports;
const DB = require('../utils/DB');

MenuRepository.createMenu = (newMenu) => DB('Menu').insert(newMenu).returning('*');
MenuRepository.getRestId = (restId) => DB.select('*').from('Menu').where('restId', restId);
MenuRepository.putMenu = (menuid, data) => DB('Menu').where('menuId', menuid).update(data).returning('*');
MenuRepository.getRestIdMenu = (menuId) => DB('Menu')
  .select('Option.optionName', 'Option.optionId', 'Sub_Option.subName').orderBy('Option.optionId')
  .join('Option', function () { this.on('Menu.menuId', '=', 'Option.menuId'); })
  .join('Sub_Option', function () {
    this.on('Option.optionId', '=', 'Sub_Option.optionId')
      .onIn('Menu.menuId', [menuId]);
  });
  MenuRepository.getSubOptions = (optionId) => DB('Sub_Option').select('*').where('optionId', optionId).orderBy('subName');
  MenuRepository.getOptions = (menuId) => DB('Option').select('*').where('menuId', menuId);
  MenuRepository.deleteSubOption = (subid) => DB('Sub_Option').select('*').where('subId', subid).del().returning('*');