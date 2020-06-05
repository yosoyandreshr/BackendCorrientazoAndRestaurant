const directionController = module.exports;
const directionService = require('../services/directionService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/logUtils');
const Validator = require('../validators/validator');
const directionSchema = require('../validators/directionRegisterSchema');


directionController.createDirection = async (req, res, next) => {
  const logName = 'Create Direction: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts DirectionController.Create Direction: params ${JSON.stringify(body)}`);

  try {
    Validator(directionSchema).validateRequest(body);

    return directionService.createDirection(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

directionController.getDirectionsByUser = async (req, res, next) => {
  const logName = 'Create Direction: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { userid } = req.params;
  logger.info(`Starts DirectionController.GetDirections  params ${JSON.stringify(userid)}`);

  return directionService.getDirectionsByUser(userid, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

directionController.getOneDirection = async (req, res, next) => {
  const logName = 'Find One Direction: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { directionid } = req.params;
  logger.info(`Starts DirectionController.GetOneDirection  params ${JSON.stringify(directionid)}`);

  return directionService.getOneDirection(directionid, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};
