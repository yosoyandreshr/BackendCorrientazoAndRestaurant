const authService = module.exports;
const bcrypt = require('bcrypt-nodejs');
const authRepository = require('../repositories/authRepository');
const userRepository = require('../repositories/userRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('authService');


authService.login = async (auth, options = {}) => {
  const { logger = defaultLogger } = options;
  let resp;
  logger.info(`authService.login with ${JSON.stringify(auth)}`);
  try {
    let hash = await authRepository.findByEmail(auth.authEmail);
    hash = bcrypt.compareSync(auth.authPassword, hash.authPassword);
    if (hash) {
      const id = await authRepository.getIdByEmail(auth.authEmail);
      resp = await userRepository.findUserByAuthId(id.authId);

      return resp;
    }

    return null;
  } catch (error) {
    console.log(error);

    return null;
  }
};
authService.update = async (auth, options = {}) => {
  const { logger = defaultLogger } = options;
  const { authEmail: authemail, authPassword: authpassword } = auth;
  logger.info(`authService.update with ${JSON.stringify(auth)}`);
  const hash = bcrypt.hashSync(authpassword);
  const authid = authRepository.getIdByEmail(authemail);
  const [resp] = await authRepository.update(authid, { authEmail: authemail, authPassword: hash });

  return resp;
};
authService.getAuthIdByEmail = async (authemail, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`authService.getAuthIdByEmail with ${JSON.stringify(authemail)}`);
  const { authemail: authEmail } = authemail;
  logger.info(`${JSON.stringify(authemail)}`);

  return authRepository.getIdByEmail(authEmail);
};
