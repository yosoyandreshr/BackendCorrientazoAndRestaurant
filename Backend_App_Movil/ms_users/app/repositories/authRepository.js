const authRepository = module.exports;
const DB = require('../utils/DB');

authRepository.create = async (auth) => DB('Auth').insert(auth).returning('*');
authRepository.countByEmail = (authemail) => DB('Auth').count('*').where({ authEmail: authemail }).first();
authRepository.findByEmail = (authemail) => DB('Auth').select('*').where({ authEmail: authemail }).first();
authRepository.getIdByEmail = (authemail) => DB('Auth').select('authId').where({ authEmail: authemail }).first();
authRepository.getAuthById = (authid) => DB('Auth').select('*').where({ authId: authid }).first();
authRepository.update = (authid, auth) => DB('Auth').where({ authId: authid }).update(auth).returning('*');
authRepository.login = (authemail, authpass) => DB('Auth').select('authId').where({ authEmail: authemail } && { authPassword: authpass }).first();
