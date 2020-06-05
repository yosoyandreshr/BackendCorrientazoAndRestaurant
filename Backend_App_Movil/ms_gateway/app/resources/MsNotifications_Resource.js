const MsNotificationsResource = module.exports;
const HttpClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3008' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/ms-notifications`;

MsNotificationsResource.saveTokenDevice = body =>
HttpClient.post(`${BASE_URL}/notification`,body);

MsNotificationsResource.getTokenDevice = (id) => 
HttpClient.get(`${BASE_URL}/notification/${id}`);

MsNotificationsResource.updateTokenDevice = (id, body) => 
HttpClient.put(`${BASE_URL}/notification/${id}`, body);