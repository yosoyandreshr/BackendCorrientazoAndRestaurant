const notificationService = module.exports;
const notificationRepository = require('../repositories/notificationsRepository');
const log4j = require('../utils/logger');
const token = require('../utils/notifications');

const defaultLogger = log4j.getLogger('notification service');

notificationService.get = async (idUser, body, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`notificationService.get ${JSON.stringify(idUser)}`);
  const [resp] = await notificationRepository.get(idUser);

  token.send(resp.tokenNotification);

  return resp;
};


notificationService.save = async (body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`notificationService.save with: ${JSON.stringify(body)}`);

  return notificationRepository.save(body);
};

notificationService.update = async (idUser, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`notificationService.update with: ${JSON.stringify(body)}`);
  logger.info(`notificationService.update with: ${JSON.stringify(idUser)}`);

  return notificationRepository.update(idUser, body);
};
