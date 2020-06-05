const authController = module.exports;
const authService = require('../services/authService');

const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');

authController.login = async (req, res, next) => {
  const logName = 'Login: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts authController.login: params ${JSON.stringify(body)}`);
  try {
    return authService.login(body, { logger, logName })
      .then((response) => res.send(response));
    // .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};


authController.update = async (req, res, next) => {
  const logName = 'LoginUpdate: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts authController.update: params ${JSON.stringify(body)}`);
  try {
    return authService.update(body, { logger, logName })
      .then((response) => res.send(response));
    // .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

authController.getAuthIdByEmail = async (req, res, next) => {
  const logName = 'AuthIdByEmail: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params } = req;
  logger.info(`Start authController.AuthIdByEmail: params ${JSON.stringify(params)}`);

  try {
    return authService.getAuthIdByEmail(params, { logger, logName })
      .then((response) => res.send(response));
    // .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
