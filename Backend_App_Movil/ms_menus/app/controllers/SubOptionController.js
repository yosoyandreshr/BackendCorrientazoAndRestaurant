const SubOptionController = module.exports;
const SubOptionService = require('../services/SubOptionService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const Log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const SubOptionRegisterSchema = require('../validators/SubOptionRegisterShema');
const Validator = require('../validators/Validator');

SubOptionController.postSubOption = async (req, res, next) => {
  const logName = 'SaveSubName';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { body } = req;
  logger.info(`Star SubOptionController.postSubOption: params ${JSON.stringify(body)}`);


  try {
    Validator(SubOptionRegisterSchema).validateRequest(body);

    return SubOptionService.createSubOption(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
