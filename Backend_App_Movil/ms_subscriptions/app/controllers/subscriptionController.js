const subscriptionController = module.exports;
const subscriptionService = require('../services/subscriptionService');
const subscriptionRegisterSchema = require('../validators/SubscriptionRegisterSchema');
const packageRegisterSchema = require('../validators/PackageRegisterSchema');

const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4js = require('../utils/logger');
const logUtils = require('../utils/LogUtils');

const validator = require('../validators/validator');

subscriptionController.createSubscription = async (req, res, next) => {
  const logName = 'postSubscription :';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;


  logger.info(` Starts SubscriptionController.saveSubscription : body  ${JSON.stringify(body)}`);

  try {
    validator(subscriptionRegisterSchema).validateRequest(body);

    return subscriptionService.createSubscription(body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

subscriptionController.createPackage = async (req, res, next) => {
  const logName = 'createPackage :';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;

  logger.info(` Starts SubscriptionController.createPackage : body  ${JSON.stringify(body)}`);

  try {
    validator(packageRegisterSchema).validateRequest(body);

    return subscriptionService.createPackage(body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};


subscriptionController.getSubsByRestaurant = async (req, res, next) => {
  const logName = 'getSub : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { restId } } = req;
  logger.info(`Starts subsController.getSubsrestaurant  : params ${JSON.stringify(restId)}`);

  return subscriptionService.getSubsByRestaurant(restId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.getSubsByUser = async (req, res, next) => {
  const logName = 'getSub : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { userId } } = req;
  logger.info(`Starts subsController.getSubsUser  : params ${JSON.stringify(userId)}`);

  return subscriptionService.getSubsByUser(userId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.getBalance = async (req, res, next) => {
  const logName = 'Get Balance';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { subId } } = req;
  logger.info(`Starts subsController.getBalanceUserId  : params ${JSON.stringify(subId)}`);

  return subscriptionService.getBalance(subId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.getOneSubscription = async (req, res, next) => {
  const logName = 'getSub : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { subId } } = req;
  logger.info(`Starts subsController.getOneSubs  : params ${JSON.stringify(subId)}`);

  return subscriptionService.getOneSubscription(subId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.getOnePackage = async (req, res, next) => {
  const logName = 'getSub : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { packageId } } = req;
  logger.info(`Starts subsController.getOnePackage  : params ${JSON.stringify(packageId)}`);

  return subscriptionService.getOnePackage(packageId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.getPacksByRestaurant = async (req, res, next) => {
  const logName = 'getSub : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { restId } } = req;
  logger.info(`Starts subsController.getPacksByRestaurant  : params ${JSON.stringify(restId)}`);

  return subscriptionService.getPacksByRestaurant(restId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.updateBalance = async (req, res, next) => {
  const logName = 'Update Balance';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  const { params: { subId } } = req;

  logger.info(`subscriptionController.updateBalance with: ${JSON.stringify(body)}`);
  logger.info(`subscriptionController.updateBalance with: ${JSON.stringify(subId)}`);

  return subscriptionService.updateBalance(subId, body, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

subscriptionController.updateStatePackage = async (req, res, next) => {
  const logName = 'Update Package';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;
  const { params: { packageid } } = req;

  logger.info(`subscriptionController.updatePackage with: ${JSON.stringify(body)}`);
  logger.info(`subscriptionController.updatepackage with: ${JSON.stringify(packageid)}`);

  return subscriptionService.updateStatePackage(packageid, body, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};
