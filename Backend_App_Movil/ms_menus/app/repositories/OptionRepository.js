const OptionRepository = module.exports;
const DB = require('../utils/DB');

OptionRepository.createOption = (newOption) => DB('Option').insert(newOption).returning('*');
