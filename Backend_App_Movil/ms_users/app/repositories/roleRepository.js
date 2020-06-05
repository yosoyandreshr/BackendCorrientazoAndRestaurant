const roleRepository = module.exports;
const DB = require('../utils/DB');

roleRepository.create = (role) => DB('Role').insert(role).returning('*');
