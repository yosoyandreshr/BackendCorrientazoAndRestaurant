const PaymentDetailController = module.exports;
const PaymentDetailService = require('../services/PaymentDetailServices');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const logUtils = require('../utils/LogUtils');
const Validator = require('../validators/Validator');
const PaymentDetailRegisterSchema = require('../validators/PaymentDetailRegisterShema');

PaymentDetailController.createPaymentDetail = async (req, res, next) => {
  const logName = 'Create Payment Detail';
  const logger = logUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  try {
    Validator(PaymentDetailRegisterSchema).validateRequest(body);
    logger.info(`Starts PaymentDetailController.create: params ${JSON.stringify(body)}`);

    return PaymentDetailService.createPaymentDetail(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

PaymentDetailController.getPaymentDetail = async (req, res, next) => {
  const logName = 'getPaymentDetailAll';
  const logger = logUtils.getLoggerWithId(log4j, logName);
  const { params: { paymentId } } = req;
  logger.info(`starts PaymentDetail.get: params ${JSON.stringify(paymentId)}`);

  return PaymentDetailService.getPaymentDetail(paymentId)
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};
