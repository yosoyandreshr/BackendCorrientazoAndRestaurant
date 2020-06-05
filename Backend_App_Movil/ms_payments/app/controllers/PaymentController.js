const PaymentService = require('../services/PaymentServices');
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const PaymentRegisterSchema = require('../validators/PaymentRegisterSchema');
const Validator = require('../validators/Validator');

class PaymentController {
  async create(req, res, next) {
    const logName = 'CreatePayment';
    const logger = LogUtils.getLoggerWithId(log4j, logName);
    const { body } = req;

    try {
      // Validator(PaymentPaypalRegisterShema).validateRequest(body);

      return PaymentService.create(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async success(req, res, next) {
    const logName = 'CreatePayment';
    const logger = LogUtils.getLoggerWithId(log4j, logName);
    const { query } = req;
    logger.info(`Starts PaymentController.Create: params ${JSON.stringify(query)}`);
    try {
      return PaymentService.success(query, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }

  async createPayment(req, res, next) {
    const logName = 'CreatePayment';
    const logger = LogUtils.getLoggerWithId(log4j, logName);
    const { body } = req;
    try {
      Validator(PaymentRegisterSchema).validateRequest(body);
      logger.info(`Starts PaymentController.Create: params ${JSON.stringify(body)}`);

      return PaymentService.createPayment(body, { logger, logName })
        .then((respose) => res.send(respose))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }


  async getPayment(req, res, next) {
    const logName = 'getPaymentAll';
    const logger = LogUtils.getLoggerWithId(log4j, logName);
    const { params: { userId } } = req;
    logger.info(`starts Payment.get: params ${JSON.stringify(userId)}`);

    return PaymentService.getPayment(userId)
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const paymentcotroller = new PaymentController();
module.exports = paymentcotroller;
