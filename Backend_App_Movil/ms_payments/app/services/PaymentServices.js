
const Promise = require('bluebird');
const paymentRepository = require('../repositories/PaymentRepository');
const log4j = require('../utils/logger');
const PaymentRequest = require('../utils/PaymentRequest');
const PaymentManager = require('../Manager/PaymentManager');

const defaultLogger = log4j.getLogger('PaymentServices');

class PaymentService {
  async create(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(`paymentCreate.create with ${JSON.stringify(payment)}`);
    const {
      name, sku, price, total, description,
    } = payment;
    console.log(payment);
    let href;

    try {
      const { links } = await PaymentManager.create(PaymentRequest.create(name, sku, price, total, description)).catch((error) => {
        logger.error(`error in create paypal config :: => ${error.stack}`);
      });
      console.log(links);
      if (links) {
        links.forEach((link) => {
          if (link.rel === 'approval_url') {
            href = link.href;
          }
        });
      }

      return { link: href };
    } catch (error) {
      return null;
    }
  }

  async success(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(
      `Start PaymentServices.create: body ${JSON.stringify(payment)}`,
    );
    const { PayerID, paymentId } = payment;
    try {
      const { transactions: [transaction] } = await PaymentManager.getPayment(paymentId);
      const { amount } = transaction;

      return PaymentManager.execute(paymentId, PaymentRequest.execute(PayerID, amount));
    } catch (error) {
      return { error };
    }
  }

  async createPayment(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(`paymentCreate.create with ${JSON.stringify(payment)}`);
    const paymentid = await paymentRepository.createPayment(payment);
    const [idPayment] = await Promise.mapSeries(paymentid, async (Payment) => {
      const { paymentId, ...otherData } = Payment;
      const id = Payment.paymentId;

      return { otherData, idPayment: id };
    });

    return idPayment;
  }

  async getPayment(userId) {
    return paymentRepository.getPayment(userId);
  }
}
const paymentservice = new PaymentService();
module.exports = paymentservice;
