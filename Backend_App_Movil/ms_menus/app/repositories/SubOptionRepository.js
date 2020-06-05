const SubOptionRepository = module.exports;
const DB = require('../utils/DB');

SubOptionRepository.createSubOption = (newSubOption) => DB('Sub_Option').insert(newSubOption).returning('*');
