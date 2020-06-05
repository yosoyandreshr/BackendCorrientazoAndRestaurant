const OrdersControllers = module.exports;
const OrdersService = require('../services/OrdersSerices');
// const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const Validator = require('../validators/Validator');
const OrderRegisterSchema = require('../validators/OrderRegisterSchema');


OrdersControllers.createOrder = async (req, res, next) => {
  const logName = 'SaveOrder';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;


  try {
    Validator(OrderRegisterSchema).validateRequest(body);

    logger.info(`Starts OrdersController.save: params ${JSON.stringify(body)}`);

    return OrdersService.createOrder(body, { logger, logName })
      .then((respose) => res.send(respose));
  } catch (error) {
    return next(error);
  }
};

OrdersControllers.getOne = async (req, res) => {
  const logName = 'Search Order';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const idUsers = req.params;

  logger.info(`Starts OrdersController.getOne params: ${JSON.stringify(idUsers)}`);
  logger.info(`Starts OrdersController.getOne params: ${JSON.stringify(body)}`);

  return OrdersService.getOne(idUsers, body, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.getOneRestaurant = async (req, res) => {
  const logName = 'Search Order';
  const logger = LogUtils.getLoggerWithId(log4j, logName);

  const restId = req.params;

  logger.info(`Starts OrdersController.getOne params: ${JSON.stringify(restId)}`);


  return OrdersService.getOneRestaurant(restId, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.getOrderAll = async (req, res) => {
  const logName = 'get ordersAlluserId';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params: { userId } } = req;

  logger.info(`Starts OrdersController.getOrderAlluserId params: ${JSON.stringify(userId)}`);

  return OrdersService.getOrderAll(userId, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.getOrderAllOrderId = async (req, res) => {
  const logName = 'get ordersAllorderId';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params: { orderId } } = req;

  logger.info(`Starts OrdersController.getOrderAllorderId params: ${JSON.stringify(orderId)}`);

  return OrdersService.getOrderAllOrderId(orderId, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.deleteOrders = async (req, res) => {
  const logName = 'deleteOrders';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const orderId = req.params;
  logger.info(`Starts OrdersController.deleteOrders params: ${JSON.stringify(orderId)}`);

  return OrdersService.deleteOrders(orderId, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.updateOrder = async (req, res) => {
  const logName = 'update orders';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { idOrder } = req.params;

  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(idOrder)}`);
  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(body)}`);


  return OrdersService.updateOrder(idOrder, body, { logger, logName })
    .then((response) => res.send(response));
};

OrdersControllers.updatePayment = async (req, res) => {
  const logName = 'update orders';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { userId } = req.params;

  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(userId)}`);
  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(body)}`);

  return OrdersService.updatePayment(userId, body, { logger, logName })
    .then((response) => res.send(response));
};
