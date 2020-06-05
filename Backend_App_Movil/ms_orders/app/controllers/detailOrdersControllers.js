const detailOrdersController = module.exports;
const detailOrderService = require('../services/detailOrderService');
// const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const Validator = require('../validators/Validator');
const detailOrderValidator = require('../validators/DetailOrderValidator');

detailOrdersController.createOrderDetail = async (req, res) => {
  const logName = 'Save Detail Order';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;

  try {
    Validator(detailOrderValidator).validateRequest(body);

    logger.info(`Starts detailOrdersController.save with: ${JSON.stringify(body)} `);

    return detailOrderService.createOrderDetail(body, { logger, logName })
      .then((response) => res.send(response));
  } catch (error) {
    return error;
  }
};

detailOrdersController.getdetailorderActive = async (req, res) => {
  const logName = 'getdetailorder';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { orderId } = req.params;

  logger.info(`Starts detailOrdersController.get ${JSON.stringify(orderId)}`);

  return detailOrderService.getDetailOrderActive(orderId)
    .then((response) => res.send(response));
};

detailOrdersController.getOrderDetailId = async (req, res) => {
  const logName = 'List OrderDetail';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params: { orderId } } = req;
  logger.info(`Starts OrderControll,get: params ${JSON.stringify(orderId)}`);


  return detailOrderService.getDetailOrder(orderId)
    .then((response) => res.send(response));
};

detailOrdersController.getdetailOrder = async (req, res) => {
  const logName = 'getdetailorder';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { orderId } = req.params;


  logger.info(`Starts detailOrdersController.get ${JSON.stringify(orderId)}`);

  return detailOrderService.getOrderDetailId(orderId)
    .then((response) => res.send(response));
};

detailOrdersController.updateOrderDetail = async (req, res) => {
  const logName = 'update orders';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  const { params: { detailId } } = req;

  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(detailId)}`);
  logger.info(`OrdersController.updateOrder with: ${JSON.stringify(body)}`);


  return detailOrderService.updateOrderDetail(detailId, body, { logger, logName })
    .then((response) => res.send(response));
};

detailOrdersController.deleteOrderDetail = async (req, res) => {
  const logName = 'deleteOrderDetail';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params: { detailId } } = req;
  logger.info(`Starts OrdersController.deleteOrderDetail params: ${JSON.stringify(detailId)}`);

  return detailOrderService.deleteOrderDetail(detailId, { logger, logName })
    .then((response) => res.send(response));
};
