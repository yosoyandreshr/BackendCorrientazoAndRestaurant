const Helpers = module.exports;

const db = require('../app/utils/DB');

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('notifications').del();
};

Helpers.create = async (data) => {
  await db('notifications').insert(data).returning('*');
};
