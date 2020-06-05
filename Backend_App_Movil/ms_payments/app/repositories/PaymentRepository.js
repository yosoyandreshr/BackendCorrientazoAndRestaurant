const PaymentRepository = module.exports;
const DB = require('../utils/DB');

PaymentRepository.createPayment = (body) => DB('Payment').insert(body).returning('*');
PaymentRepository.getPayment = (userId) => DB.select('*').from('Payment').where({ userId })
  .orderBy('created_at', 'desc');
