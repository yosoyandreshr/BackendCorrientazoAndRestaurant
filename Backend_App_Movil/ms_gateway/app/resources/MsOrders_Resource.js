const OrdersResource = module.exports;
const HttpClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3004' } = process.env;

const Base_Url = `${MICROSERVICE_URL}/api/ms-orders`;

OrdersResource.getOrders = body =>
 HttpClient.get(`${Base_Url}/order`,body);

OrdersResource.getOrdersByRestaurant = restId =>
 HttpClient.get(`${Base_Url}/order/restaurant/${restId}`);

 OrdersResource.getOrdersActive = (id) =>
 HttpClient.get(`${Base_Url}/detailOrdersActive/${id}`);

 OrdersResource.getOrderByUser = (id,body) =>
 HttpClient.post(`${Base_Url}/order/${id}`,body);

 OrdersResource.createOrder = (body) =>
 HttpClient.post(`${Base_Url}/orders`, body);
 
 OrdersResource.creaOrderDetail = (body) =>
 HttpClient.post(`${Base_Url}/detailOrders`, body);

 OrdersResource.updateOrder = (id, body) => 
 HttpClient.put(`${Base_Url}/orders/update/${id}`,body);

 OrdersResource.updatePayment = (userId, body) =>
 HttpClient.put(`${Base_Url}/orderPayment/${userId}`, body);

 OrdersResource.updateOrderDetail = (detailId, body) =>
 HttpClient.put(`${Base_Url}/detailOrderId/${detailId}`, body);
   
 OrdersResource.getOrderDetailId = (orderId) =>
 HttpClient.get(`${Base_Url}/orderDetail/${orderId}`);

 OrdersResource.getOrdersDetail = (orderId) => 
 HttpClient.get(`${Base_Url}/detailOrders/${orderId}`);

 OrdersResource.getOrderAllOrderId = (orderId) =>
 HttpClient.get(`${Base_Url}/orderAllOrderId/${orderId}`);

 OrdersResource.getOrderAllBasket = (userId) =>
 HttpClient.get(`${Base_Url}/orderAll/${userId}`);

 OrdersResource.deleteOrderId = (orderId) =>
 HttpClient.delete(`${Base_Url}/orderIdDelete/${orderId}`);

 OrdersResource.deleteOrderDetail = (detailId) =>
 HttpClient.delete(`${Base_Url}/orderDetail/${detailId}`);



