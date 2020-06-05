const Helpers = module.exports;
const restaurantService = require('../app/services/restaurantService');

const DB = require('../app/utils/DB');

Helpers.migrate = () => DB.migrate.latest();

Helpers.clear = async () => {
  await DB('restaurant').del();
  await DB('Auth').del();
};
Helpers.clear2 = async () => {
  await DB('state').del();
};

Helpers.create = async (data) => DB('restaurant').insert(data).returning('*');
Helpers.create2 = async (data) => DB('state').insert(data).returning('*');
Helpers.createAuth = async (body) => {
  await DB('Auth').insert(body).returning('*');
};

Helpers.createrestaurant = async (body) => restaurantService.create(body, {});
