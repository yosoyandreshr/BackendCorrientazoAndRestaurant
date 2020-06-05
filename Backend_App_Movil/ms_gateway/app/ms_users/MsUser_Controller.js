const MsUserController = module.exports;
const {BaseError} = require('../utils/ErrorHandlerMiddleware');
const MsUserResouce = require('../resources/MsUser_Resource');
const MsUser_Manager = require('../ms_users/MsUser_Manager')


MsUserController.login = (req, res, next) => {
  const logName = 'Login: ';
  const logger = req.log || console
  const {body} = req;
  const token = req.get('token');
  logger.info(`Starts authController.login: params ${JSON.stringify(body)}`);
  return MsUser_Manager.login(body, { logger,logName })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.save = async (req, res, next) => {
  const logName = 'SaveUser: ';
  const logger = req.log || console
  const {body} = req;
  logger.info(`Starts userController.save: params ${JSON.stringify(body)}`);

  MsUserResouce.save(body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.getUsers = async (req, res, next) => {
  const logName = 'GetUsers';
  const logger = req.log || console;
  const {body} = req;

  logger.info(`Starts getUsers MsUserController with: ${JSON.stringify(body)}`);

  return MsUserResouce.getUsers(body, {logger, logger})
  .then((response) => res.send(response))
  .catch((error) => next(new BaseError(error.message)));

}

MsUserController.getUser = async (req, res, next) => {
  const logName = 'GetUser: ';
  const logger = req.log || console
  const {params: {id} } = req;
  
  logger.info(`Starts userController.getUser: params ${JSON.stringify(id)}`);

  MsUserResouce.getUser(id, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.deleteDirection = async (req, res, next) => {
  const logName = 'GetUser: ';
  const logger = req.log || console
  const {params: {id}} = req;
  logger.info(`Starts userController.delete: params ${JSON.stringify(id)}`);
  MsUserResouce.deleteDirection(id, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.email = async (req, res, next) => {
  const logName = 'SaveUser: ';
  const logger = req.log || console
  const {body} = req;
  logger.info(`Starts userController.save: params ${JSON.stringify(body)}`);

  MsUserResouce.email(body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));


};
MsUserController.update = async (req, res, next) => {
  const logName = 'SaveUser: ';
  const logger = req.log || console
  const { params: {id}} = req;
  const {body} = req;
  
  logger.info(`Starts userController.save: params ${JSON.stringify(body)}`);
  logger.info(`Starts userController.save: params ${JSON.stringify(id)}`);

  MsUserResouce.updateUser(id,body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));


};

MsUserController.updatePassword = async (req, res, next) => {
  const logName = 'UpdatePassword: ';
  const logger = req.log || console
  const {params: {authid}} = req;
  const {body} = req;
  
  logger.info(`Starts userController.UpdatePassword:: body ${JSON.stringify(body)}`);
  logger.info(`Starts userController.UpdatePassword:: params ${JSON.stringify(authid)}`);

  MsUserResouce.updatePassword(authid,body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.resetPassword = async (req, res, next) => {
  const logName = 'Reset Password: ';
  const logger = req.log || console
  const {body} = req;
  
  logger.info(`Starts userController.resetPassword:: body ${JSON.stringify(body)}`);
  

  MsUserResouce.resetPassword(body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.getDirectionsByUser = async (req, res, next) => {
  const logName = 'GetDirectionsByUser: ';
  const logger = req.log || console
  const {params: {id}} = req;
  
  logger.info(`Starts userController.getDirectionsByUser: params ${JSON.stringify(id)}`);

  MsUserResouce.getDirectionsByUser(id, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.getOneDirection = async (req, res, next) => {
  const logName = 'GetOneDirection: ';
  const logger = req.log || console
  const {params: {id}} = req;

  logger.info(`Starts userController.getOneDirection: params ${JSON.stringify(id)}`);

  MsUserResouce.getOneDirection(id, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsUserController.saveDirection = async (req, res, next) => {
  const logName = 'SaveDirection: ';
  const logger = req.log || console
  const {body} = req;
  logger.info(`Starts userController.saveDirection: params ${JSON.stringify(body)}`);

  MsUserResouce.saveDirection(body, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};
