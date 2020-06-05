const restaurantService = module.exports;
const bcrypt = require('bcrypt-nodejs');
const restaurantRepository = require('../repositories/restaurantRepository');
const log4j = require('../utils/logger');
const authRepository = require('../repositories/authRepository');
const emailController = require('../controllers/emailController');

const defaultlogger = log4j.getLogger('restaurantService');

restaurantService.create = async (restaurant, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`Restaurant.create with ${JSON.stringify(restaurant)}`);

  const {
    namerestaurant: NameRestaurant,
    description: Description,
    image: Image,
    celphone: Celphone,
    direction: Direction,
    schedule: Schedule,
    city: City,
    authEmail: authemail,
    authPassword: authpassword,
  } = restaurant;

  const res = await authRepository.countByEmail(authemail);

  if (res.count < 1) {
    const hash = bcrypt.hashSync(authpassword);
    const [auth] = await authRepository.create({
      authEmail: authemail,
      authPassword: hash,
    });

    const [userCreated] = await restaurantRepository.create({
      namerestaurant: NameRestaurant,
      description: Description,
      image: Image,
      celphone: Celphone,
      direction: Direction,
      schedule: Schedule,
      city: City,
      authId: auth.authId,

    }).catch((error) => console.log(error));
    console.log(userCreated);

    return userCreated;
  }

  return null;
};


restaurantService.getOneByCity = async (city, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`restaurantService.getOnerestaurantByCity with ${JSON.stringify(city)}`);

  return restaurantRepository.getOneByCity(city);
};

restaurantService.getOneByName = async (name, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`restaurantService.getOnerestaurantByName with ${JSON.stringify(name)}`);

  return restaurantRepository.getOneByName(name);
};


restaurantService.get = async () => restaurantRepository.get();


restaurantService.putrest = async (restaurant, restid, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`restaurant.put with ${JSON.stringify(restaurant)}`);
  logger.info(`restaurant.put with ${JSON.stringify(restid)}`);

  const [client] = await restaurantRepository.putrest(restaurant, restid);

  return client;
};


restaurantService.getRestOne = async (restid, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`restaurant.getoneRestaurant with ${JSON.stringify(restid)}`);
  const [rest] = await restaurantRepository.getRestOne(restid);

  return rest;
};

restaurantService.getRestByAuthId = async (authId, options = {}) => {
  const { logger = defaultlogger } = options;
  logger.info(`restaurant.getoneRestaurant with ${JSON.stringify(authId)}`);
  const [rest] = await restaurantRepository.getRestByAuthId(authId);

  return rest;
};


restaurantService.findAuthIdByUserId = async (userid, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`userService.getUsers with ${JSON.stringify(userid)}`);
  logger.info(`authServices.getOne with ${JSON.stringify(userid)}`);
  const user = await restaurantRepository.findUserByAuthId(userid);

  return user;
};

restaurantService.resetPassword = async (body, options = {}) => {
  const {
    logger = defaultlogger,
  } = options;
  logger.info(`restaurantService.resetPassword with ${JSON.stringify(body)}`);
  const newPassword = Math.random().toString(36).substr(2, 5);
  const hash = bcrypt.hashSync(newPassword);
  const emailAuthId = await authRepository.getIdByEmail(body.authEmail);
  const restAuthId = await restaurantRepository.getRestByNamerestaurant(body.namerestaurant);
  const data = {
    authEmail: body.authEmail,
    authPassword: hash,
  };


  if (emailAuthId.authId === restAuthId.authId) {
    const [success] = await authRepository.update(emailAuthId.authId, data);


    await emailController.sendEmailPassword(body.authEmail, newPassword);


    return success;
  }

  return null;
};
