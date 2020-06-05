const notificationController = module.exports;
const notificationService = require('../services/notificationServices');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');

notificationController.get = async (req, res) => {
  const logName = 'get notification';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  logger.info('Starts notificationController.get');
  const { params: { idUser } } = req;

  return notificationService.get(idUser)
    .then((response) => res.send(response));
};

notificationController.save = async (req, res) => {
  const logName = 'save token of user';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`notificationController.save with: ${JSON.stringify(body)}`);

  return notificationService.save(body)
    .then((response) => res.send(response));
};

notificationController.update = async (req, res) => {
  const logName = 'update Token device';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { idUser } = req.params;

  logger.info(`Starts  notification controller ${JSON.stringify(body)}`);
  logger.info(`Starts  notification controller ${JSON.stringify(idUser)}`);

  return notificationService.update(idUser, body, { logger, logName })
    .then((response) => res.send(response));
};
