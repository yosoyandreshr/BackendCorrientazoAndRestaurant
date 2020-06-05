const OptionService = module.exports;
const OptionRepository = require('../repositories/OptionRepository');
const Log4j = require('../utils/logger');

const DefaultLogger = Log4j.getLogger('OptionService');

OptionService.createOption = async (newOption, options = {}) => {
  const { logger = DefaultLogger } = options;
  logger.info(`OptionService.createOption with ${JSON.stringify(newOption)}`);
  const [option]= await OptionRepository.createOption(newOption);

  return option;
};
