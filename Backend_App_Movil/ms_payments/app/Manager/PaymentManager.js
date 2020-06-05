const PaymentManager = module.exports;
const PaypalConfig = require('../configs/PaypalConfig');
const Log4js = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');


PaymentManager.create = (pay) => new Promise((resolve, reject) => {
  const LogName = 'Paypal create';
  const logger = LogUtils.getLoggerWithId(Log4js, LogName);
  PaypalConfig.payment.create(pay, (error, payment) => {
    logger.info(`Start paypalConfig.create: body  ${JSON.stringify(pay)}`);
    if (error) return reject(error);


    return resolve(payment);
  });
});

PaymentManager.execute = (paymentId, success) => new Promise((resolve, reject) => {
  PaypalConfig.payment
    .execute(paymentId, success, (error, payment) => {
      if (error) return reject(error);

      return resolve(payment);
    });
});


PaymentManager.getPayment = (paymentId) => new Promise((resolve, reject) => {
  PaypalConfig.payment.get(paymentId, (error, payment) => {
    if (error) return reject(error);

    return resolve(payment);
  });
});
