const MsOrders_controller = module.exports;
const {BaseError} = require('../utils/ErrorHandlerMiddleware');
const MsOrdersmanager = require('../ms_orders/MsOrders_Manager');
const OrdersResource = require('../resources/MsOrders_Resource');
const RestaurantResource = require('../resources/MsRestaurant_Resource');



MsOrders_controller.getOrders = async (req, res, next) => {
    const logName = 'ordersController';
    const logger = req.log || console;
    const {body} = req;
    logger.info(`Starts gateway OrdersController with: ${JSON.stringify(body)}`);
    return OrdersResource.getOrders(body, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.getOrderByUser = async (req, res, next) => {
    
    const logName = 'ordersController';
    const logger = req.log || console;
    const {params: {id }} = req;
    const {body} = req;
    logger.info(`Starts gateway OrdersController with: ${JSON.stringify(id)}`);
    logger.info(`Starts gateway OrdersController with: ${JSON.stringify(body)}`);

    return MsOrdersmanager.getOrderById(id, body, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.getOrdersByRestaurant = async (req, res, next) => {
        const logName = 'ordersController';
        const logger = req.log || console;
        const {params: { restId } } = req;
        logger.info(`Starts gateway OrdersController with: ${JSON.stringify(restId)}`);

        return OrdersResource.getOrdersByRestaurant(restId, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.getDetailOrdersActive = async(req, res, next) => {
    const logName = 'ordersController';
    const logger= req.log || console;
    const { params: {id} } = req;

    logger.info(`Starts gateway OrdersController with: ${JSON.stringify(id)}`);

    return MsOrdersmanager.getOrderActive(id, {logger,logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.getDetailOrders = async(req, res, next) => {
    const logName = 'ordersController';
    const logger = req.log || console;
    const { params: {id} } = req;

    logger.info(`Starts gateway OrdersController with: ${JSON.stringify(id)}`);

    return MsOrdersmanager.getOrdersDetail(id, {logger, logName})
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));

};
MsOrders_controller.getOrderAll = async (req, res, next) => {
    const logName = 'get orders';
    const logger = req.log || console;
    logger.info(`comienza a trabajar ${logName}`);

    return MsOrdersmanager.getOrderAll({logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.getOrderAllOrderId = async (req, res, next) => {
    const logName = 'get ordersAllorderId';
    const logger = req.log || console;
    const {params: {orderId}} = req;
    logger.info(`Starts OrdersController.getOrderAllorderId params: ${JSON.stringify(orderId)}`);
  
    return OrdersResource.getOrderAllOrderId(orderId, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

MsOrders_controller.getOrderAllBasket = async (req, res, next) => {
    const logName = 'get orders';
    const logger = req.log || console;
    const {params: {userId}}= req;
    logger.info(`comienza a trabajar ${JSON.stringify(userId)}`);

    return OrdersResource.getOrderAllBasket( userId,{logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.createOrder = async (req, res, next) => {
    const logName = 'SaveOrder';
    const logger = req.log || console;
    const {body} = req;
    logger.info(`Starts OrdersController.save: params ${JSON.stringify(body)}`);
    OrdersResource.createOrder(body, {logger,logName})
        .then((respose) => res.send(respose))
        .catch((error) => next(new BaseError(error.message)));
};

MsOrders_controller.creaOrderDetail = async (req, res, next) => {
    const logName = 'Save Detail Order';
    const logger = req.log || console;
    const {body} = req;
    logger.info(`Starts detailOrdersController.save with: ${JSON.stringify(body)} `);
    OrdersResource.creaOrderDetail(body, {logger,logName})
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
};
MsOrders_controller.update = async (req, res, next) => {
    const logName = 'Update Order: ';
    const logger = req.log || console;
    const {id} = req.params;
    const {body} = req;
    logger.info(`Starts orderController.update: body ${JSON.stringify(body)}`);
    logger.info(`Starts orderController.update: params ${JSON.stringify(id)}`);
    
     OrdersResource.updateOrder(id,body, {logger,logName})
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
      
  };
  MsOrders_controller.updatePayment = async (req, res,next) => {
    const logName = 'update orders';
    const logger = req.log || console;
    const { body } = req;
    const { userId } = req.params;
    
    logger.info(`OrdersController.updateOrder with: ${JSON.stringify(userId)}`);
    logger.info(`OrdersController.updateOrder with: ${JSON.stringify(body)}`);
    
      
     OrdersResource.updatePayment(userId, body, {logger, logName})
      .then((response)=> res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };
  MsOrders_controller.updateOrderDetail = async (req, res, next) => {
    const logName = 'update orders';
    const logger = req.log || console;
    const { body } = req;
    const {params : {detailId}}= req;
    
    logger.info(`OrdersController.updateOrder with: ${JSON.stringify(detailId)}`);
    logger.info(`OrdersController.updateOrder with: ${JSON.stringify(body)}`);
    
      
      return OrdersResource.updateOrderDetail(detailId, body, {logger, logName})
      .then((response)=> res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  
  };
  MsOrders_controller.deleteOrderDetail = async (req, res, next) => {
    const logName = 'deleteOrderDetail';
    const logger = req.log || console;
    const {params : {detailId}} = req;
    logger.info(`Starts OrdersController.deleteOrderDetail params: ${JSON.stringify(detailId)}`);
  
    return OrdersResource.deleteOrderDetail(detailId, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };

  MsOrders_controller.deleteOrderId = async (req, res, next) => {
    const logName = 'deleteOrders';
    const logger = req.log || console;
    const { params : {orderId} } = req;
    logger.info(`Starts OrdersController.deleteOrders params: ${JSON.stringify(orderId)}`);
  
    return OrdersResource.deleteOrderId(orderId, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  };