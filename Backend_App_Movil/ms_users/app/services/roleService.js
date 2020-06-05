const roleService = module.exports;
const roleRepository = require('../repositories/roleRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('roleService');

roleService.create = async (role, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`roleService.create with ${JSON.stringify(role)}`);
  const { roleName: rolename } = role;

  return roleRepository.create({ roleName: rolename });
};
