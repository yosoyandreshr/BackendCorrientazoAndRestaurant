const OrdersDetailRepository = module.exports;
const DB = require('../utils/DB');

OrdersDetailRepository.createOrderDetail = (orders) => DB('OrderDetail').insert(orders).returning('*');


OrdersDetailRepository.getDetailOrderActive = (orderId) => DB('OrderDetail').select('Order.userId', 'Order.address',
  'Order.menuName', 'Order.price', 'Order.state', 'Order.restId').join('Order', function () {
  this.on('Order.orderId', '=', 'OrderDetail.orderId').onIn('Order.orderId', [orderId]);
}).whereNot('Order.state', '=', 'RECIBIDO')
  .andWhereNot('Order.state', '=', 'CANCELADO');


OrdersDetailRepository.getDetailOrder = (orderId) => DB('OrderDetail').select('Order.userId', 'Order.address',
  'Order.menuName', 'Order.price', 'Order.state', 'Order.restId').join('Order', function () {
  this.on('Order.orderId', '=', 'OrderDetail.orderId').onIn('Order.orderId', [orderId]);
});

OrdersDetailRepository.getOrderDetailId = (orderId) => DB('OrderDetail').select('orderDetailId', 'subName').where('orderId', orderId);

OrdersDetailRepository.updateOrderDetail = (detailId, newOrderDetail) => DB('OrderDetail').where('orderDetailId', detailId).update(newOrderDetail).returning('*');

OrdersDetailRepository.deleteOrderDetail = (detailId) => DB('OrderDetail').where('orderDetailId', detailId).del().returning('*');
