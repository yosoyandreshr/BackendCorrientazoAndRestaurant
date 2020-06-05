const subscriptionRepository = module.exports;
const DB = require('../utils/DB');


subscriptionRepository.create = (subscription) => DB('Subscription').insert(subscription).returning('*');
subscriptionRepository.getSubsByUser = (userId) => DB('Subscription').where('userId', userId).select('*');

subscriptionRepository.getBalance = (subId) => DB('Subscription').select('credit').where('subId', subId);

subscriptionRepository.getSubsByRestaurant = (restId) => DB('Subscription').where('restId', restId).select('*');
subscriptionRepository.getOneSubscription = (subId) => DB('Subscription').select('*').where('subId', subId);


subscriptionRepository.createPackage = (Package) => DB('Package').insert(Package).returning('*');
subscriptionRepository.getPacksByRestaurant = (restId) => DB('Package').select('*').where('restId', restId).orderBy('subvalue','asc');
subscriptionRepository.getOnePackage = (packageId) => DB('Package').select('*').where('packageId', packageId).first();
subscriptionRepository.updatePackage = (packageid, pack) => DB('Package').where('packageId', packageid).update(pack).returning('*');
subscriptionRepository.updateBalance = (subId, newBalance) => DB('Subscription').where('subId', subId).update(newBalance).returning('*');
