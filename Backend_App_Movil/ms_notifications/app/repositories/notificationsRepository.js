const notificationRespository = module.exports;
const DB = require('../utils/DB');

notificationRespository.get = (idUser) => DB('notifications').select('tokenNotification').where('idUser', idUser);
notificationRespository.save = (notification) => DB('notifications').insert(notification).returning('*');
notificationRespository.update = (idUser, notification) => DB('notifications').where('idUser', idUser).update(notification).returning('*');
