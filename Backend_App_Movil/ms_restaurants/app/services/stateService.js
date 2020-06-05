const stateService = module.exports;
const stateRepository = require('../repositories/stateRepository');
const log4j = require('../utils/logger');

const defaultlogger = log4j.getLogger('stateService');

stateService.create = async (state, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`Subscription.create with ${JSON.stringify(state)}`);

  const { statename: Statename } = state;

  return stateRepository.create({
    statename: Statename,
  });
};

stateService.getOne = async (stateid, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`StateService.getOne with ${JSON.stringify(stateid)}`);

  return stateRepository.getOne(stateid);
};


stateService.get = async () => stateRepository.get();

stateService.putest = async (statename, stateid, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`state.put with ${JSON.stringify(statename)}`);
  logger.info(`state.put with ${JSON.stringify(stateid)}`);

  return stateRepository.putest(stateid, statename);
};
