const detailOrderService = module.exports;
const detailOrderRepository = require('../repositories/DetailOrderRepository');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('DetailOrderService');

detailOrderService.createOrderDetail = async (orders, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`DetailOrdersService.create with ${JSON.stringify(orders)} `);

  return detailOrderRepository.createOrderDetail(orders);
};


detailOrderService.getDetailOrderActive = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`detailOrderService.getDetailOrder with: ${JSON.stringify(idUser)}`);
  const order = await detailOrderRepository.getDetailOrderActive(idUser);

  return order;
};

detailOrderService.getDetailOrder = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`detailOrderService.getDetailOrder with: ${JSON.stringify(idUser)}`);

  const [order] = await detailOrderRepository.getDetailOrder(idUser);

  return order;
};

detailOrderService.getOrderDetailId = async (orderId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`detailOrderService.get with ${JSON.stringify(orderId)}`);
  const resp = await detailOrderRepository.getOrderDetailId(orderId);

  return resp;
};

detailOrderService.updateOrderDetail = async (detailId, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.updateOrderDetail with: ${JSON.stringify(detailId)}`);
  logger.info(`OrdersServices.updateOrderDetail with: ${JSON.stringify(body)}`);

  const [order] = await detailOrderRepository.updateOrderDetail(detailId, body);

  return order;
};

detailOrderService.deleteOrderDetail = async (detailId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.deleteOrderDetail with ${JSON.stringify(detailId)}`);
  Number(detailId);

  return detailOrderRepository.deleteOrderDetail(detailId);
};
