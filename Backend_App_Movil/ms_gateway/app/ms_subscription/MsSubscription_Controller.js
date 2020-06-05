const MsSubscriptionController = module.exports;
const {BaseError} = require('../utils/ErrorHandlerMiddleware');
const MssubscriptionResource = require('../resources/MsSubscription_Resource');
const MsSubscriptionManager = require('../ms_subscription/MsSubscription_Manager');


MsSubscriptionController.createPackage = async (req, res, next) => {
    const logName = 'CreatePackage: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts MsController: params ${JSON.stringify(body)}`);
  
    return  MssubscriptionResource.createPackage(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsSubscriptionController.createSubscription = async (req, res, next) => {
    const logName = 'CreateSubscription: ';
    const logger = req.log || console
    const {body} = req;
    logger.info(`Starts MsController: params ${JSON.stringify(body)}`);
  
    return MssubscriptionResource.createSubscription(body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsSubscriptionController.getSubsByRestaurant = async (req, res, next) => {
    console.log('ENTRO QUI');
    const logName = 'GetSubsRest';
    const logger = req.log || console
    const {params: {restId}} = req;
    
    console.log(restId);
    
    logger.info(`Starts MsSubscriptionController.getSubsByRestaurant: params ${JSON.stringify(restId)}`);
    return  MssubscriptionResource.getSubsByRestaurant(restId, {logger, logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  
  };

  MsSubscriptionController.getSubsByUser = async (req, res, next) => {
    const logName = 'GetSubsRest: ';
    const logger = req.log || console
    
    const {params:{userId}} = req;
    console.log('esto llega aqui');
    console.log(userId);
    
    logger.info(`Starts MsSubscriptionController.getSubsByUser: params ${JSON.stringify(userId)}`);
  
    return MsSubscriptionManager.getOneSubscription(userId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  };

  MsSubscriptionController.getOneSubscription = async (req, res, next) => {
    const logName = 'GetOneSubs: ';
    const logger = req.log || console
    const {params: {subId}} = req;
  
    logger.info(`Starts MsSubscriptionController.getOneSubscription: params ${JSON.stringify(subId)}`);
  
    return MssubscriptionResource.getOneSubscription(subId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  };

  MsSubscriptionController.getOnePackage = async (req, res, next) => {
    const logName = 'GetOnePackage: ';
    const logger = req.log || console
    const {params: {packageId}} = req;
  
    logger.info(`Starts MsSubscriptionController.getOnepackage: params ${JSON.stringify(packageId)}`);
  
    return MssubscriptionResource.getOnePackage(packageId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  };

  MsSubscriptionController.getPacksByRestaurant = async (req, res, next) => {
    const logName = 'GetSubsRest: ';
    const logger = req.log || console;
    const {params: {restId}} = req;
    logger.info(`Starts MsSubscriptionController.getSubsByRestaurant: params ${JSON.stringify(restId)}`);
  
    return MssubscriptionResource.getPacksByRestaurant(restId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsSubscriptionController.getBalance = async (req,res,next) => {
    const logName = 'Get Balance';
    const logger = req.log || console;
    const { params: {subId}}= req;
    logger.info(`Starts subsController.getBalanceUserId  : params ${JSON.stringify(subId)}`);
  
    return MssubscriptionResource.getBalance(subId, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
  };

  MsSubscriptionController.updateBalance = async (req,res,next) => {
    const logName = 'Update Balance';
    const logger = req.log || console;
    const {body} = req;
    const {params: {subId}} = req;
    
    logger.info(`subscriptionController.updateBalance with: ${JSON.stringify(body)}`);
    logger.info(`subscriptionController.updateBalance with: ${JSON.stringify(subId)}`);
  
    return MssubscriptionResource.updateBalance(subId,body,{logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
  }

  MsSubscriptionController.updatePackage = async (req,res,next) => {
    const logName = 'Update Package';
    const logger = req.log || console;
    const {body} = req;
    const {params: {packageid}} = req;
    
    logger.info(`subscriptionController.updatePackage with: ${JSON.stringify(body)}`);
    logger.info(`subscriptionController.updatepackage with: ${JSON.stringify(packageid)}`);
  
    return MssubscriptionResource.updatePackage(packageid,body,{logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
  }
  