const directionService = module.exports;
const directionRepository = require('../repositories/directionRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('roleService');

directionService.createDirection = async (direction, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`directionService.createDirection with ${JSON.stringify(direction)}`);
  const {
    nameDirection: useradress, userCity: usercity, userId: userid,
  } = direction;
  const res = await directionRepository.countByDirection(useradress);

  if (res.count < 1) {
    const [directions] = await directionRepository.createDirection({ userId: userid, nameDirection: useradress, userCity: usercity });

    return directions;
  }

  return { message: 'la direccion ya existe' };
};

directionService.getDirectionsByUser = async (userid, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`directionService.getdirectionByUser with ${JSON.stringify(userid)}`);
  const directions = await directionRepository.getDirections(userid);


  return directions;
};

directionService.getOneDirection = async (directionid, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`directionService.getdirectionByUser with ${JSON.stringify(directionid)}`);
  const directions = await directionRepository.getOneDirection(directionid);


  return directions;
};
directionService.delete = async (directionid, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`directionService.deletedirection with ${JSON.stringify(directionid)}`);

  return directionRepository.deleteDirection(directionid);
};
