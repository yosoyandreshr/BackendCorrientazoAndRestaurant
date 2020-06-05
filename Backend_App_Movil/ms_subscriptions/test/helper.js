const Helpers = module.exports;

const DB = require('../app/utils/DB');

Helpers.migrate = () => DB.migrate.latest();

Helpers.clear = async () => {
  await DB('Subscription').del();
};

Helpers.clear2 = async () => {
  await DB('Package').del();
};

Helpers.create = async (data) => DB('Subscription').insert(data).returning('*');

Helpers.create2 = async (data) => DB('Package').insert(data).returning('*');
