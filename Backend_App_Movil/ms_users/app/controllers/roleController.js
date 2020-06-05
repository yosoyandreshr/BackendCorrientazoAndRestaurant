const roleController = module.exports;
const roleService = require('../services/roleService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/logUtils');
const Validator = require('../validators/validator');
const roleRegisterSchema = require('../validators/roleRegisterSchema');


roleController.save = async (req, res, next) => {
  const logName = 'RoleUser: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts roleController.save: params ${JSON.stringify(body)}`);

  try {
    Validator(roleRegisterSchema).validateRequest(body);

    return roleService.create(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
