const OrdersServices = module.exports;
const Promise = require('bluebird');
const OrdersRepository = require('../repositories/OrdersRepository');
const log4js = require('../utils/logger');

const defaultLogger = log4js.getLogger('OrdersService');


OrdersServices.createOrder = async (orders, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersService.create with ${JSON.stringify(orders)}`);

  const Orders = await OrdersRepository.createOrder(orders);
  const [idOrder] = await Promise.mapSeries(Orders, async (order) => {
    const { orderId, ...otherData } = order;
    console.log(otherData);
    const b = order.orderId;

    return {
      idOrders: b,
    };
  });

  return idOrder;
};


OrdersServices.getOne = async (idUsers, body, options = {}) => {
  const { logger = defaultLogger } = options;
  const { idUsers: id } = idUsers;
  const { state } = body;
  const userId = Number(id);
  let resp;
  logger.info(`OrdersServices.getOne with ${JSON.stringify(userId)}`);
  logger.info(`OrdersServices.getOne with ${JSON.stringify(state)}`);
  // eslint-disable-next-line eqeqeq
  if (state == 'CERRADO') {
    resp = OrdersRepository.getOneInHistory(userId);
  // eslint-disable-next-line eqeqeq
  } else if (state == 'ABIERTO') {
    resp = OrdersRepository.getOneInProcess(userId);
  }

  return resp;
};


OrdersServices.getOneRestaurant = async (restId, options = {}) => {
  const { logger = defaultLogger } = options;
  const { restId: id } = restId;


  const idRest = Number(id);

  logger.info(`OrdersServices.getOne with ${JSON.stringify(idRest)}`);

  const resp = await OrdersRepository.getOneInProcessRestaurant(idRest);


  return resp;
};

OrdersServices.getOrder = async () => OrdersRepository.getOrder();


OrdersServices.getOrderAll = async (userId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.getOrderAlluserId with ${JSON.stringify(userId)}`);

  return OrdersRepository.getOrderAll(userId);
};

OrdersServices.getOrderAllOrderId = async (orderId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.getOrderAllorderId with ${JSON.stringify(orderId)}`);

  const [listOrderId] = await OrdersRepository.getOrderAllOrderId(orderId);

  return listOrderId;
};


OrdersServices.deleteOrders = async (orderId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.deleteOrders with ${JSON.stringify(orderId)}`);

  Number(orderId);

  return OrdersRepository.deleteOrder(orderId);
};

OrdersServices.updateOrder = async (idOrder, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.updateOrder with: ${JSON.stringify(idOrder)}`);
  logger.info(`OrdersServices.updateOrder with: ${JSON.stringify(body)}`);

  const [order] = await OrdersRepository.updateOrder(idOrder, body);

  return order;
};

OrdersServices.updatePayment = async (userId, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`OrdersServices.updateOrder with: ${JSON.stringify(userId)}`);
  logger.info(`OrdersServices.updateOrder with: ${JSON.stringify(body)}`);

  const order = await OrdersRepository.updatePayment(userId, body);

  return order;
};
