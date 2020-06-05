const stateRepository = module.exports;
const DB = require('../utils/DB');

stateRepository.create = (state) => DB('state').insert(state).returning('*');
stateRepository.getOne = (stateid) => DB('state').select('*').where({ stateid });
stateRepository.get = () => DB('state').select('*').from('state');
stateRepository.putest = (stateid, statename) => DB('state').where(statename).update(stateid).returning('*');
stateRepository.getests = (statename) => DB('state').where('statename', statename).select('*');
