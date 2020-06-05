const restaurantRepository = module.exports;
const DB = require('../utils/DB');

restaurantRepository.create = (restaurant) => DB('restaurant').insert(restaurant).returning('*');

restaurantRepository.getOneByCity = (city) => DB('restaurant').where('city', city).select('*');
restaurantRepository.getOneByName = (name) => DB('restaurant').where('namerestaurant', name).select('*').first();
restaurantRepository.get = () => DB.select('*').from('restaurant');
restaurantRepository.putrest = (restaurant, restid) => DB('restaurant')
  .where('restid', restid).update(restaurant).returning('*');

restaurantRepository.getRestOne = (restid) => DB('restaurant').select('*').where({ restid });
restaurantRepository.getRestByAuthId = (authId) => DB('restaurant').select('*').where({ authId });
restaurantRepository.findUserByAuthId = (authid) => DB('restaurant').select('*').where({ authId: authid }).first();
restaurantRepository.getRestByNamerestaurant = (name) => DB('restaurant').select('authId')
  .where({ namerestaurant: name })
  .first();
