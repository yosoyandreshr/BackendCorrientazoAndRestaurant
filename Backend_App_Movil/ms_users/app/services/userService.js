const userService = module.exports;
const bcrypt = require('bcrypt-nodejs');
// const nodemailer = require('nodemailer');
const emailController = require('../controllers/emailController');
const userRepository = require('../repositories/userRepository');
const authRepository = require('../repositories/authRepository');
// const directionRepository = require('../repositories/directionRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('userService');

userService.create = async (user, options = {}) => {
  const {
    logger = defaultLogger,
  } = options;
  logger.info(`userService.create with ${JSON.stringify(user)}`);
  const {
    userName: username,
    userIdentification: userId,
    userPhone: userphone,
    authEmail: authemail,
    authPassword: authpassword,
    // nameDirection: useradress,
    // userCity: usercity
  } = user;
  const res = await authRepository.countByEmail(authemail);

  if (res.count < 1) {
    const hash = bcrypt.hashSync(authpassword);
    const roleid = 1;
    const [auth] = await authRepository.create({
      authEmail: authemail,
      authPassword: hash,
      roleId: roleid,
    });
    const [userCreated] = await userRepository.create({
      userName: username,
      userIdentification: userId,
      userPhone: userphone,
      debt: '0.0',
      authId: auth.authId,
    });

    return userCreated;
  }

  return null;
};
userService.findAuthIdByUserId = async (userid, options = {}) => {
  const {
    logger = defaultLogger,
  } = options;
  logger.info(`userService.getUsers with ${JSON.stringify(userid)}`);


  logger.info(`authServices.getOne with ${JSON.stringify(userid)}`);

  const user = await userRepository.findUserByAuthId(userid);

  return user;
};
userService.findByUserId = async (userid, options = {}) => {
  const {
    logger = defaultLogger,
  } = options;
  logger.info(`userService.findByUserId with ${JSON.stringify(userid)}`);
  const [user] = await userRepository.findByUserId(userid);


  return user;
};


userService.updateUser = async (user, userid, options = {}) => {
  const {
    logger = defaultLogger,
  } = options;
  logger.info(`userService.updateUser with ${JSON.stringify(user)}`);
  logger.info(`userService.updateUser with ${JSON.stringify(userid)}`);
  const [client] = await userRepository.updateUser(user, userid);

  return client;
};
userService.resetPassword = async (user, options = {}) => {
  const {
    logger = defaultLogger,
  } = options;
  logger.info(`userService.resetPassword with ${JSON.stringify(user)}`);
  const newPassword = Math.random().toString(36).substr(2, 5);
  const hash = bcrypt.hashSync(newPassword);
  const emailAuthId = await authRepository.getIdByEmail(user.authEmail);
  const userAuthId = await userRepository.findAuthIdByUserId(user.userIdentification);
  const roleid = 1;
  const data = {
    authEmail: user.authEmail,
    authPassword: hash,
    roleId: roleid,
  };

  if (emailAuthId.authId === userAuthId.authId) {
    const [success] = await authRepository.update(emailAuthId.authId, data);
    await emailController.sendEmailPassword(user.authEmail, newPassword);
    console.log(newPassword);
    

    return success;
  }

  return null;
};
