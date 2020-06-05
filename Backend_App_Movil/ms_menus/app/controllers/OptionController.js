const OptionController = module.exports;
const OptionService = require('../services/OptionService');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const Log4j = require('../utils/logger');
const OptionRegisterSchema = require('../validators/OptionRegisterShema');
const Validator = require('../validators/Validator');
const LogUtils = require('../utils/LogUtils');

OptionController.postOption = async (req, res, next) => {
  const logName = 'SaveOption';
  const logger = LogUtils.getLoggerWithId(Log4j, logName);
  const { body } = req;
  logger.info(`Star OptionController.postOption: params ${JSON.stringify(body)}`);

  try {
    Validator(OptionRegisterSchema).validateRequest(body);

    return OptionService.createOption(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};
