const PaymentDetailRepository = module.exports;
const DB = require('../utils/DB');

PaymentDetailRepository.createPaymentDetail = (paymentDetail) => DB('PaymentDetail').insert(paymentDetail)
  .returning('*');
PaymentDetailRepository.getPaymentDetail = (paymentId) => DB('PaymentDetail').select('*').where({ paymentId });
