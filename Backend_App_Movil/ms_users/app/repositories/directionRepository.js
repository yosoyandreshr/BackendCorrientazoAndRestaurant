const directionRepository = module.exports;
const DB = require('../utils/DB');


directionRepository.getDirections = (userid) => DB('Direction').select('*').where('userId', userid).orderBy('directionId', 'desc');
directionRepository.getOneDirection = (directionid) => DB('Direction').select('*').where('directionId', directionid).first('*');
directionRepository.deleteDirection = (directionid) => DB('Direction').where('directionId', directionid).del();
directionRepository.createDirection = (direction) => DB('Direction').insert(direction).returning('*');
directionRepository.countByDirection = (namedirection) => DB('Direction').count('*').where({ nameDirection: namedirection }).first();
