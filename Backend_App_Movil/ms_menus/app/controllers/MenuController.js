const MenuController = module.exports;
const MenuService = require('../services/MenuService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const Log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const MenuRegisterSchema = require('../validators/MenuRegisterSchema');
const Validator = require('../validators/Validator');

MenuController.postMenu = async (req, res, next) => {
  const logName = 'SaveMenu:';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { body } = req;
  logger.info(`Star MenuController.postMenu: params ${JSON.stringify(body)}`);

  try {
    Validator(MenuRegisterSchema).validateRequest(body);

    return MenuService.createMenu(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

MenuController.putMenu = async (req, res, next) => {
  const logName = 'PutMenu';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { body } = req;
  const { menuid } = req.params;
  logger.info(`Starts MenuController.putMenu : body ${JSON.stringify(menuid)}`);
  logger.info(`Starts MenuCongroller.putMenu : body ${JSON.stringify(body)}`);
  

    return MenuService.putMenu(menuid, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
 
};

MenuController.getRestId = async (req, res, next) => {
  const logName = 'getRestId';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);

  const { params: { restId } } = req;
  logger.info(`Starts MenuController.get: params ${JSON.stringify(restId)}`);

  return MenuService.getRestId(restId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MenuController.getRestIdMenu = async (req, res, next) => {
  const logName = 'getMenuId';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { params: { menuId } } = req;
  logger.info(`Starts MenuController.get: params ${JSON.stringify(menuId)}`);

  return MenuService.getRestIdMenu(menuId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MenuController.getSubOptionsByoptionId = async (req, res, next) => {
  const logName = 'getSubOptions';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { params: { optionId } } = req;
  logger.info(`Starts MenuController.get: params ${JSON.stringify(optionId)}`);

  return MenuService.getSubOptions(optionId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MenuController.getOptionsBymenuId = async (req, res, next) => {
  const logName = 'getOptions';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { params: { menuId } } = req;
  logger.info(`Starts MenuController.get: params ${JSON.stringify(menuId)}`);

  return MenuService.getOptions(menuId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MenuController.deleteSubOption = async (req, res, next) => {
  const logName = 'delete SubOptions';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { params: { subid } } = req;
  logger.info(`Starts MenuController.deleteSubOption: params ${JSON.stringify(subid)}`);

  return MenuService.deleteSubOption(subid)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

