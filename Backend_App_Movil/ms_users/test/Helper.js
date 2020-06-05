const Helpers = module.exports;
const db = require('../app/utils/DB');
const userService = require('../app/services/userService');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('User').del();
  await db('Auth').del();
};


Helpers.create = async (body) => {
  await db('User').insert(body).returning('*');
};

Helpers.createAuth = async (body) => {
  await db('Auth').insert(body).returning('*');
};
Helpers.update = async (user, userid) => {
  await db('User').where('userIdentification', userid).update(user).returning('*');
};

Helpers.createRole = async (body) => {
  await db('Role').insert(body).returning('*');
};

Helpers.createUser = async (body) => userService.create(body, {});
