const Helpers = module.exports;

const db = require('../app/utils/DB');

Helpers.migrate = () => db.migrate.latest();


Helpers.clear = async () => {
  await db('OrderDetail').del();
  await db('Order').del();
};

Helpers.create = async (data) => {
  await db('Order').insert(data).returning('*');
};

Helpers.createDetail = async (data) => {
  await db('OrderDetail').insert(data).returning('*');
};
