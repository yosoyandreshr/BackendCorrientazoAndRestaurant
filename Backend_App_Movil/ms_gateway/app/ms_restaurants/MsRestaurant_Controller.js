const MsRestaurantController = module.exports;
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const MsRestaurantResource = require('../resources/MsRestaurant_Resource');
const MsRestaurantManager = require('../ms_restaurants/MsRestaurant_Manager');

MsRestaurantController.login = (req, res, next) => {
  const logName = 'Login: ';
  const logger = req.log || console
  const {body} = req;
  const token = req.get('token');
  logger.info(`Starts authController.login: params ${JSON.stringify(body)}`);
  return MsRestaurantResource.login(body, { logger,logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsRestaurantController.getRestaurant = async (req, res) => {
    const logName = 'Get Restaurant';
    const logger = req.log || console;
    const { body } = req;
    logger.info(` Starts RestaurantController.get: body  ${JSON.stringify(body)}`);
    
    return MsRestaurantResource.getRestaurant(body,{logger, logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsRestaurantController.getrestid = async (req, res, next) => {
    const logName = 'getRestaurantId : ';
    const logger = req.log || console;
    const { params: { restId } } = req;
    logger.info(`Starts Retaurant.get  : params ${JSON.stringify(restId)}`);
  
    return MsRestaurantResource.getrestid(restId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };
  MsRestaurantController.getRestByAuthId = async (req, res, next) => {
    const logName = 'getRestaurantAuthId : ';
    const logger = req.logger || console;
    const { params: {authId} } = req;
    logger.info(`Starts Retaurant.getRestaurantByAuthId: params ${JSON.stringify(authId)}`);
  
    return MsRestaurantResource.getRestByAuthId(authId,{logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsRestaurantController.getRestByCity = async (req, res, next) => {
    const logName = 'getRestaurantCity : ';
    const logger = req.logger || console;
    const { params: {city} } = req;
    logger.info(`Starts Retaurant.getRestaurantByCity: params ${JSON.stringify(city)}`);
  
    return MsRestaurantResource.getRestaurantByCity(city,{logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsRestaurantController.getRestByName = async (req, res, next) => {
    const logName = 'getRestaurantCity : ';
    const logger = req.logger || console;
    const { params: {name} } = req;
    logger.info(`Starts Retaurant.getRestaurantByCity: params ${JSON.stringify(name)}`);
  
    return MsRestaurantResource.getRestaurantByName(name,{logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsRestaurantController.save = async (req, res, next) => {
    const logName = 'SaveUser: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts userController.save: params ${JSON.stringify(body)}`);
  
    MsRestaurantResource.save(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsRestaurantController.getOneRestaurant = async (req , res , next) => { 
      const logName = 'RestaurantController';
      const logger = req.log || console;
      const { params: {restId} } = req;
      const {body}= req;
    
      logger.info(`Starts gateway RestaurantController with: ${JSON.stringify(restId)}`);
      logger.info(`Starts gateway RestaurantController with: ${JSON.stringify(body)}`);
    
      return MsRestaurantManager.getRestaurantId(restId, body,{logger,logName}) 
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
    }

    MsRestaurantController.update = async (req, res, next) => {
      const logName = 'UpdaterRestaurant: ';
      const logger = req.log || console
      const {params: {id}} = req;
      const {body} = req;

      logger.info(`Starts MsRestaurantController.save: params ${JSON.stringify(body)}`);
      logger.info(`Starts MsRestaurantController.save: params ${JSON.stringify(id)}`);
      
      MsRestaurantResource.update(id,body, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    
};
MsRestaurantController.resetPassword = async (req, res, next) => {
  const logName = 'Reset Password: ';
  const logger = req.log || console
  const {body} = req;
  
  logger.info(`Starts restaurantController.resetPassword:: body ${JSON.stringify(body)}`);
  

  MsRestaurantResource.resetPassword(body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsRestaurantController.updatePassword = async (req, res, next) => {
  const logName = 'update Password: ';
  const logger = req.log || console
  const {params: {authid}} = req;
  const {body} = req;

  logger.info(`Starts MsRestaurantController.save: params ${JSON.stringify(body)}`);
  logger.info(`Starts MsRestaurantController.save: params ${JSON.stringify(authid)}`);
  
  MsRestaurantResource.updatePassword(authid,body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));

};
