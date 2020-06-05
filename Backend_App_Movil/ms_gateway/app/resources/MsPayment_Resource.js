const MsPaymentResource = module.exports;
const HttpClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3006' } = process.env;

const Base_Url = `${MICROSERVICE_URL}/api/ms-payments`;

MsPaymentResource.create = (body) =>
    HttpClient.post(`${Base_Url}/paymentSave`, body);

MsPaymentResource.success = (uri) => HttpClient.get(uri);

MsPaymentResource.createPayment = body =>
    HttpClient.post(`${Base_Url}/payment`, body);

MsPaymentResource.getPayment = userId =>
    HttpClient.get(`${Base_Url}/get/${userId}`);

MsPaymentResource.getPaymentDetail = paymentId =>
    HttpClient.get(`${Base_Url}/getDetail/${paymentId}`);

MsPaymentResource.createPaymentDetail = body =>
    HttpClient.post(`${Base_Url}/paymentDetail`, body)