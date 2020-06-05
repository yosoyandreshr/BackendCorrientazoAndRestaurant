const SubOptionService = module.exports;
const SubOptionRepository = require('../repositories/SubOptionRepository');
const Log4j = require('../utils/logger');

const DefaultLogger = Log4j.getLogger('SubOptionService');

SubOptionService.createSubOption = async (newSubOption, options = {}) => {
  const { logger = DefaultLogger } = options;
  logger.info(`SubOptionService.createSucOption with ${JSON.stringify(newSubOption)}`);
  const [subOption]= await SubOptionRepository.createSubOption(newSubOption);

  return subOption;
};
