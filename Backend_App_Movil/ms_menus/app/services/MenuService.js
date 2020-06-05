const MenuService = module.exports;
const MenuRepository = require('../repositories/MenuRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('MenuService');

MenuService.createMenu = async (newMenu, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.createMenu with ${JSON.stringify(newMenu)}`);
  const [menu] = await MenuRepository.createMenu(newMenu);

  return menu;
};

MenuService.putMenu = async (menuid, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.putMenu with ${JSON.stringify(menuid)}`);
  logger.info(`MenuService.putMenu with ${JSON.stringify(body)}`);
  const [menu] = await MenuRepository.putMenu(menuid, body);
  return menu;
};

MenuService.getRestId = async (restId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.getRestId with ${JSON.stringify(restId)}`);
  const resp = await MenuRepository.getRestId(restId);

  return resp;
};

MenuService.getRestIdMenu = async (menuId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.getRestIdMenu with ${JSON.stringify(menuId)}`);
  const resp = await MenuRepository.getRestIdMenu(menuId);

  return resp;
};

MenuService.getSubOptions = async (optionId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.getSubOtions with ${JSON.stringify(optionId)}`);
  const resp = await MenuRepository.getSubOptions(optionId);

  return resp;
};

MenuService.getOptions = async (menuId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.getSubOtions with ${JSON.stringify(menuId)}`);
  const resp = await MenuRepository.getOptions(menuId);

  return resp;
};

MenuService.deleteSubOption = async (subid, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`MenuService.getSubOtions with ${JSON.stringify(subid)}`);
  const resp = await MenuRepository.deleteSubOption(subid);

  return resp;
};
