const OrdersRepository = module.exports;
const DB = require('../utils/DB');

OrdersRepository.createOrder = (orders) => DB('Order').insert(orders).returning('*');

OrdersRepository.getOneInProcess = (idUsers) => DB('Order').whereNot('state', 'CANCELADO').whereNot('state', 'RECIBIDO').whereNot('state', 'BASKET')
  .andWhere('userId', idUsers)
  .select('*')
  .orderBy('state');
OrdersRepository.getOneInHistory = (idUsers) => DB('Order').whereNot('state', 'ACEPTADO').whereNot('state', 'ENVIADO').whereNot('state', 'SOLICITADO')
  .whereNot('state', 'BASKET')
  .andWhere('userId', idUsers)
  .select('*')
  .orderBy('state');

OrdersRepository.getOrder = () => DB('Order').select('orderId').groupBy('orderId');

OrdersRepository.getOrderAll = (userId) => DB('Order').select('*').where('state', '=', 'BASKET').andWhere('userId', userId);

OrdersRepository.getOrderAllOrderId = (orderId) => DB('Order').select('*').where('orderId', orderId);

OrdersRepository.deleteOrder = (orderId) => DB('Order').where(orderId).del().returning('*');

OrdersRepository.updateOrder = (idOrder, newOrder) => DB('Order').where('orderId', idOrder).update(newOrder).returning('*');

OrdersRepository.getOneInProcessRestaurant = (restId) => DB('Order').whereNot('state', 'RECIBIDO').andWhere('restId', restId).select('*');

OrdersRepository.getOneInHistoryRestaurant = (restId) => DB('Order').whereNot('state', 'ACEPTADO').whereNot('state', 'ENVIADO').whereNot('state', 'SOLICITADO')
  .andWhereNot('state', 'CANCELADO')
  .andWhere('restId', restId)
  .select('*');

OrdersRepository.updatePayment = (userId, newOrder) => DB('Order').where('userId', userId).andWhere('state', '=', 'BASKET').update(newOrder)
  .returning('*');
