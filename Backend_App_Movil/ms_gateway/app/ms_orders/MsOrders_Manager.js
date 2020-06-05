const MsOrdersManager = module.exports;
const OrderResource = require('../resources/MsOrders_Resource');
const RestaurantResource = require('../resources/MsRestaurant_Resource');
const Promise = require('bluebird');


MsOrdersManager.getOrderById = async (id, body, { logger, logName }) => {

    const orders = await OrderResource.getOrderByUser(id, body);
    const Restaurantdetail = await Promise.mapSeries(orders, async (order) => {
        const { restId, ...otherData } = order;
        const p = await RestaurantResource.getrestid(restId);  
        const {...data} = p;
        return {...data,...otherData}
    })
    return Restaurantdetail;
}

MsOrdersManager.getOrderAll = async (options = {}) => {

    const {logger} = options;
    logger.info(`Star MsOrder.get`);
    const getOrder = await OrderResource.getOrders();
    const resOrder = await Promise.mapSeries(getOrder, async (orderlist) => {
        const {orderId, ...otherData}= orderlist;
        const [detailOrder] = await OrderResource.getOrderDetailId(orderId);
        const { ...data} =detailOrder;
        return {...data,...otherData};
    })
    return resOrder;
}

MsOrdersManager.getOrdersDetail = async(id) => {
    const order = await OrderResource.getOrderDetailId(id);
    const {...data} = order;
    const orderDetail= await OrderResource.getOrdersDetail(id) ;
    return{...data,
    orderDetail};
}

MsOrdersManager.getOrderActive = async(id) => {
    const orders = await OrderResource.getOrdersActive(id);

    return orders;
}