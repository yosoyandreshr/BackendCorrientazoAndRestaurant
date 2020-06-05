const MsPaymentController = module.exports;
const {BaseError} = require('../utils/ErrorHandlerMiddleware');
const MsPaymentResource = require('../resources/MsPayment_Resource');
const MsPaymentManager = require('./MsPayment_Manager');

MsPaymentController.create =  (req, res, next) => {
  const logName = 'CreatePayment';
  const logger = req.log || console;
  const { body } = req;
  
    return MsPaymentManager.create(body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
}

MsPaymentController.success = (req, res, next) => {
  const logName = 'success: ';
  const logger = req.log || console;
  const { body } = req;

  logger.info(`Starts PaymentsController.success: body ${JSON.stringify(body)}`);

    return MsPaymentManager.success(body, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsPaymentController.createPayment = async (req, res, next) => {
    const logName = 'SavePayment';
    const logger = req.log || console;
    const {body} = req;
    logger.info(`Starts PaymentController.save: params ${JSON.stringify(body)}`);
    return MsPaymentResource.createPayment(body, {logger,logName})
        .then((respose) => res.send(respose))
        .catch((error) => next(new BaseError(error.message)));
};

MsPaymentController.getPayment = async (req, res,next) => {
  const logName = 'getPaymentAll';
  const logger = req.log || console;
  const {params: {userId}}= req;
  logger.info(`starts Payment.get: params ${JSON.stringify(userId)}`);
  
 return MsPaymentResource.getPayment(userId, {logger,logName})
.then((response) => res.send(response))
.catch((error) => next(new BaseError(error.message)));

};

MsPaymentController.getPaymentDetail = async (req, res, next) => {
  const logName = 'getPaymentDetailAll';
  const logger = req.log || console;
  const { params: { paymentId} } = req;
  logger.info(`starts Payment.get: params ${JSON.stringify(paymentId)}`);

  return MsPaymentResource.getPaymentDetail(paymentId,{logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));

};

MsPaymentController.createPaymentDetail = async (req, res, next) => {
  const logName = 'Create Payment Detail';
  const logger = req.log || console;
  const {body} = req;
  try {
      logger.info(`Starts PaymentDetailController.create: params ${JSON.stringify(body)}`);
      return MsPaymentResource.createPaymentDetail(body, {logger,logName})
          .then((response) => res.send(response))
          .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
      return next(error)

  }
}