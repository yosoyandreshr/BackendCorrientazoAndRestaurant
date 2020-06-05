const stateController = module.exports;
const stateService = require('../services/stateService');
const stateRegisterSchema = require('../validators/stateRegisterSchema');

const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4js = require('../utils/logger');
const logUtils = require('../utils/LogUtils');

const validator = require('../validators/validator');

stateController.post = async (req, res, next) => {
  const logName = 'postState :';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { body } = req;

  logger.info(` Starts StateController.post : body  ${JSON.stringify(body)}`);

  try {
    validator(stateRegisterSchema).validateRequest(body);

    return stateService.create(body)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

stateController.get = async (req, res, next) => {
  const logName = 'GetState : ';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params: { stateid } } = req;
  logger.info(`Starts StateController.get  : params ${JSON.stringify(stateid)}`);

  return stateService.getOne(stateid)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

stateController.getstate = async (req, res) => stateService.get()
  .then((response) => res.send(response));


stateController.put = async (req, res, next) => {
  const logName = 'putRestaurant :';
  const logger = logUtils.getLoggerWithId(log4js, logName);
  const { params } = req;

  logger.info(` Starts SubscriptionController.params : params  ${JSON.stringify(params)}`);

  const { body } = req;

  logger.info(` Starts SubscriptionController.post : body  ${JSON.stringify(body)}`);

  try {
    validator(stateRegisterSchema).validateRequest(body);

    return stateService.putest(params, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
