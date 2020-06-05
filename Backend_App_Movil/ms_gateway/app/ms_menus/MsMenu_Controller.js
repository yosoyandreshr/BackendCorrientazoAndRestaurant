const MsMenuController = module.exports;
const {BaseError} = require('../utils/ErrorHandlerMiddleware');
const MsMenuResource = require('../resources/MsMenu_Resource');
const MsMenuManager = require('./MsMenu_Manager');
MsMenuController.getRestId = async (req, res, next) => {
    const logName = 'Get Menu: ';
    const logger = req.log || console;
    const {params: {restId}} = req;
    logger.info(`Starts MenuController.get: params ${JSON.stringify(restId)}`);

    return MsMenuResource.getRestId(restId, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsMenuController.getRestIdMenu = async (req, res, next) => {
    const logName = 'Get Option';
    const logger = req.log || console;
    const {params: { menuId }} = req;
    logger.info(`Starts MenuController.get: params ${JSON.stringify(menuId)}`);

    return MsMenuManager.getRestIdMenu(menuId, {logger,logName})
        .then(response => res.send(response))
        .catch(error => next(new BaseError(error.message)));
}

MsMenuController.getOptions = async (req, res, next) => {
    const logName = 'Get Options';
    const logger = req.log || console;
    const {params: { menuid }} = req;
    logger.info(`Starts MenuController.get: params ${JSON.stringify(menuid)}`);

    return MsMenuManager.getOptionsById(menuid, {logger,logName})
        .then(response => res.send(response))
        .catch(error => next(new BaseError(error.message)));
}

MsMenuController.getMenuOptionSubOption = (req, res, next) => {
    const logName = 'Get Option,Sub_Option';
    const logger = req.log || console;
    const {params: { menuId}} = req;
    logger.info(`Starts MenuController.get: params del menu ${JSON.stringify(menuId)}`);
    return MsMenuManager.getMenuOptionSubOption(menuId, {logger,logName})
        .then(response => res.send(response))
        .catch(error => next(new BaseError(error.message)));
}

MsMenuController.createMenu = async (req, res, next) => {
    const logName = 'SaveMenu: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts menuController.save: params ${JSON.stringify(body)}`);
  
    MsMenuResource.createMenu(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsMenuController.createOption = async (req, res, next) => {
    const logName = 'SaveOption: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts menuController.save: params ${JSON.stringify(body)}`);
  
    MsMenuResource.createOption(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsMenuController.createSubOpcion = async (req, res, next) => {
    const logName = 'SaveSubOpcion: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts menuController.save: params ${JSON.stringify(body)}`);
  
    MsMenuResource.createSubOption(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsMenuController.deleteSubOption = (req, res, next) => {
    const logName = 'Delete Sub_Option';
    const logger = req.log || console;
    const {params: { subid}} = req;
    logger.info(`Starts MenuController.deleteSubOption: params ${JSON.stringify(subid)}`);
    return MsMenuResource.deleteSubOption(subid, {logger,logName})
        .then(response => res.send(response))
        .catch(error => next(new BaseError(error.message)));
}

MsMenuController.updateMenu = async (req, res, next) => {
    const logName = 'Update Menu';
    const logger = req.log || console;
    const {params: { menuid }} = req;
    const {body}= req;
    logger.info(`Starts MenuController.updateMenu: params ${JSON.stringify(menuid)}`);
    logger.info(`Starts MenuController.Updatemenu: params ${JSON.stringify(body)}`);

    return MsMenuResource.updateMenu(menuid,body, {logger,logName})
        .then(response => res.send(response))
        .catch(error => next(new BaseError(error.message)));
}
  
