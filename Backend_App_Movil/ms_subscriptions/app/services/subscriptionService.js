const subscriptionService = module.exports;
const subscriptionRepository = require('../repositories/subscriptionRepository');
const log4j = require('../utils/logger');

const defaultlogger = log4j.getLogger('subscriptionService');

subscriptionService.createSubscription = async (subscription, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`Subscription.createSubscription with ${JSON.stringify(subscription)}`);

  const {
    userId: Userid, packageId: Packageid, restId: Restid, credit: Credit,
  } = subscription;
  const [subs] = await subscriptionRepository.create({
    userId: Userid, packageId: Packageid, restId: Restid, credit: Credit,
  });

  return subs;
};

subscriptionService.createPackage = async (Package, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`Subscription.createPackage with ${JSON.stringify(Package)}`);

  const {
    description: Description, restId: Restid, state: State, subvalue: SubValue, balance: Balance,
  } = Package;
  const [pack] = await subscriptionRepository.createPackage({
    description: Description, restId: Restid, subvalue: SubValue, balance: Balance, state: State
  });

  return pack;
};

subscriptionService.getSubsByRestaurant = async (restId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getSubsRestaurant with ${JSON.stringify(restId)}`);

  return subscriptionRepository.getSubsByRestaurant(restId);
};

subscriptionService.getSubsByUser = async (userId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getSubsUser with ${JSON.stringify(userId)}`);

  return subscriptionRepository.getSubsByUser(userId);
};


subscriptionService.getBalance = async (subId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getBalance with ${JSON.stringify(subId)}`);
  const balance = await subscriptionRepository.getBalance(subId);

  return balance;
};

subscriptionService.getOneSubscription = async (subId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getOneSubscription with ${JSON.stringify(subId)}`);
  const [getOne] = await subscriptionRepository.getOneSubscription(subId);

  return getOne;
};

subscriptionService.getOnePackage = async (packageId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getOnePackage with ${JSON.stringify(packageId)}`);

  return subscriptionRepository.getOnePackage(packageId);
};

subscriptionService.getPacksByRestaurant = async (restId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.getPacksByRestaurant with ${JSON.stringify(restId)}`);

  return subscriptionRepository.getPacksByRestaurant(restId);
};

subscriptionService.updateBalance = async (subId, body, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.updateBalance with: ${JSON.stringify(body)}`);
  logger.info(`subscriptionService.updateBalance with: ${JSON.stringify(subId)}`);

  return subscriptionRepository.updateBalance(subId, body);
};

subscriptionService.updateStatePackage = async (packageid, body, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`subscriptionService.updatePackage with: ${JSON.stringify(body)}`);
  logger.info(`subscriptionService.updatepackage with: ${JSON.stringify(packageid)}`);
  const [pack] = await subscriptionRepository.updatePackage(packageid, body);

  return pack;
};
