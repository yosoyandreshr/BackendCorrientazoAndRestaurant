const restaurantController = module.exports;
const restaurantService = require('../services/restaurantService');
const restaurantRegisterSchema = require('../validators/restaurantRegisterSchema');
const {
  BaseError,
} = require('../utils/ErrorHandlerMiddleware');
const log4js = require('../utils/logger');
const logUtils = require('../utils/LogUtils');
const validator = require('../validators/validator');


restaurantController.getrestaurant = async (req, res) => restaurantService.get()
  .then((response) => res.send(response));

restaurantController.getrest = async (req, res, next) => {
  const logName = 'getRestaurant : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { restid } } = req;
  logger.info(`Starts Retaurant.get  : params ${JSON.stringify(restid)}`);

  return restaurantService.getRestOne(restid)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

restaurantController.getRestByAuthId = async (req, res, next) => {
  const logName = 'getRestaurantByAuthId : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { authId } } = req;
  logger.info(`Starts Retaurant.getRestaurantByAuthId: params ${JSON.stringify(authId)}`);

  return restaurantService.getRestByAuthId(authId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};


restaurantController.post = async (req, res, next) => {
  const logName = 'PosRestaurant :';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  logger.info(` Starts SubscriptionController.post : body  ${JSON.stringify(body)}`);
  try {
    validator(restaurantRegisterSchema).validateRequest(body);


    return restaurantService.create(body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};


restaurantController.getByCity = async (req, res, next) => {
  const logName = 'getRestaurantByCity : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const {
    params: {
      city,
    },
  } = req;
  logger.info(`Starts MenuController.getCity  : params ${JSON.stringify(city)}`);

  return restaurantService.getOneByCity(city)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

restaurantController.getByName = async (req, res, next) => {
  const logName = 'getRestaurantByCity : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const {
    params: {
      name,
    },
  } = req;
  logger.info(`Starts MenuController.getName  : params ${JSON.stringify(name)}`);

  return restaurantService.getOneByName(name)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

restaurantController.put = async (req, res) => {
  const logName = 'UpdateRestaurant : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);

  const { body } = req;
  logger.info(`Start restaurantController.UpdateRestaurant: body ${JSON.stringify(body)}`);

  const { restid } = req.params;
  logger.info(`Start restaurantController.UpdateRestaurant: params ${JSON.stringify(restid)}`);

  return restaurantService.putrest(body, restid, { logger, logName })
    .then((response) => res.send(response));
};

restaurantController.findAuthIdByUserId = async (req, res) => {
  const logName = 'findAuthIdByUserId: ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params } = req;
  logger.info(`Start userController.findAuthIdByUserId: params ${JSON.stringify(params.authid)}`);


  return restaurantService.findAuthIdByUserId(params.authid, { logger, logName })
    .then((response) => res.send(response));
  // .catch((error) => next(new BaseError(error.message)));
};

restaurantController.resetPassword = async (req, res, next) => {
  const logName = 'resetPasword: ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  logger.info(`Starts restaurantController.resetPassword: params ${JSON.stringify(body)}`);


  try {
    return restaurantService.resetPassword(body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
