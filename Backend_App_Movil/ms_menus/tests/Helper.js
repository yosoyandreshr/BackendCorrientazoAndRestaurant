const Helpers = module.exports;
const db = require('../app/utils/DB');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('Sub_Option').del();
  await db('Option').del();
  await db('Menu').del();
};

Helpers.createmenu = async (data) => {
  await db('Menu').insert(data).returning('*');
};

Helpers.createoption = async (data) => {
  await db('Option').insert(data).returning('*');
};

Helpers.createsuboption = async (data) => {
  await db('Sub_Option').insert(data).returning('*');
};
