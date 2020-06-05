const Helpers = module.exports;
const db = require('../app/utils/DB');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('PaymentDetail').del();
  await db('Payment').del();
};

Helpers.createpayment = async (data) => {
  await db('Payment').insert(data).returning('*');
};

Helpers.createpaymentdetail = async (data) => {
  await db('PaymentDetail').insert(data).returning('*');
};
