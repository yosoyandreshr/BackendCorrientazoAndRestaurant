const usersRepository = module.exports;
const DB = require('../utils/DB');

usersRepository.create = (user) => DB('User').insert(user).returning('*');
usersRepository.findByUserId = (id) => DB('User').select('*').where('userId', id);
usersRepository.findByUserIdentification = (identification) => DB('User').select('*').where('userIdentification', identification);
usersRepository.findUserByAuthId = (authid) => DB('User').select('*').where({ authId: authid }).first();
usersRepository.findAuthIdByUserId = (id) => DB('User').select('authId').where({ userIdentification: id }).first();
usersRepository.updateUser = (user, userid) => DB('User').where('userId', userid).update(user).returning('*');
