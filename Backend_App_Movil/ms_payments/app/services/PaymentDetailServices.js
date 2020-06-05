const PaymentDetailService = module.exports;
const PaymentDetailRepository = require('../repositories/PaymentDetailRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('PaymentDetailService');


PaymentDetailService.createPaymentDetail = async (paymentDetail, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`PaymentDetailService.Create with ${JSON.stringify(paymentDetail)}`);

  return PaymentDetailRepository.createPaymentDetail(paymentDetail);
};

PaymentDetailService.getPaymentDetail = async (paymentId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`Payment.getPaymentDetailAll with ${JSON.stringify(paymentId)}`);

  return PaymentDetailRepository.getPaymentDetail(paymentId);
};
